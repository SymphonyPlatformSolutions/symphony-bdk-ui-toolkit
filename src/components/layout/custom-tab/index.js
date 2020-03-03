import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactResizeDetector from 'react-resize-detector';
import Text from '../../misc/text';
import { CloseButton } from '../../misc/button/icon-buttons';

const StyledTab = styled.div`
  padding: 8px 16px;
  margin-right: 3px;
  display: flex;
  align-items: center;
  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.grey_200 : theme.colors.grey_100)};
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  transition: background-color 0.3s;
  min-width: 40px;
  :hover {
    background-color: ${({ theme, isActive }) => (isActive ? undefined : theme.colors.grey_300)};
  }
`;
const TabTitle = styled(Text)`
  margin-top: 4px;
  margin-bottom: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const TabTileContainer = styled.div`
  display: flex;
`;

const TabTitleComponent = ({ title }) => {
  const titleRef = useRef();

  return <TabTitle ref={titleRef}>{title}</TabTitle>;
};

const Tab = props => {
  const {
    title,
    clickHandler,
    hasClose,
    closeHandler,
    isActive,
    TabComponent,
    tellWidthHandler,
    currWidth,
  } = props;

  const closeClickHandler = e => {
    if (e.button === 0) {
      e.stopPropagation();
      closeHandler();
    }
  };

  const tabClickHandler = e => {
    if (e.button === 1) {
      closeHandler();
    }
  };

  return (
    <div>
      <ReactResizeDetector handleWidth>
        {({ width }) => {
          if (width) {
            if (currWidth !== width) {
              tellWidthHandler(width);
            }
          }
          return (
            <StyledTab
              onClick={isActive ? null : clickHandler}
              isActive={isActive}
              onMouseDown={tabClickHandler}
            >
              <>
                {TabComponent ? (
                  <TabComponent {...props} />
                ) : (
                  <TabTitleComponent title={title} />
                )}
                {hasClose && (
                  <div style={{ marginLeft: '6px' }}>
                    <CloseButton
                      size={10}
                      style={{ outline: 'none' }}
                      onMouseDown={closeClickHandler}
                    />
                  </div>
                )}
              </>
            </StyledTab>
          );
        }}
      </ReactResizeDetector>
    </div>
  );
};

const TabContentContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.grey_200};
  padding: 16px 16px;
`;

const TabLineup = styled.div`
  display: flex;
`;

const renderTabs = (
  tabs,
  onChange,
  onClose,
  activeTab,
  tellWidthHandler,
  tabSizes,
  hiddenTabs,
) => (
  <TabLineup>
    {tabs.map((el, index) => {
      const { hasClose = true } = el;
      if (hiddenTabs.find(shouldNotRender => shouldNotRender.id === el.id)) {
        return null;
      }
      return (
        <Tab
          {...el}
          tellWidthHandler={thisTabWidth => tellWidthHandler(thisTabWidth, el.id)}
          isActive={index === activeTab}
          hasClose={hasClose}
          key={el.id}
          currWidth={tabSizes[el.id]}
          clickHandler={() => onChange(index)}
          closeHandler={() => (hasClose ? onClose(index) : null)}
        />
      );
    })}
  </TabLineup>
);

const singleRender = (tabs, activeTab) => tabs[activeTab].content();
const allRender = (tabs, activeTab) => (
  <div>
    {tabs.map((el, index) => {
      if (index !== activeTab) {
        return undefined;
      }
      return el.content();
    })}
  </div>
);

const AddIcon = styled(CloseButton)`
  transform: rotate(45deg);
  padding: 5px;
  margin-left: 5px;
  outline: none;
`;

const ExcessIconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ExcessEllipsis = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grey_100};
  padding: 4px;
  border-radius: 50%;
  cursor: pointer;
`;
const ExcessMenuContainer = styled.div`
  position: absolute;
  padding: 8px;
  right: 0;
  top: 14px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.grey_300};
`;

const ExcessMenu = props => {
  const {
    hiddenTabs, activeTab, onChange, onClose, totalTabs,
  } = props;
  return (
    <ExcessMenuContainer>
      {hiddenTabs.map((el, index) => {
        const { hasClose = true } = el;
        return (
          <Tab
            {...el}
            tellWidthHandler={() => {}}
            isActive={totalTabs - hiddenTabs.length + index === activeTab}
            hasClose={hasClose}
            key={el.id}
            clickHandler={() => onChange(totalTabs - hiddenTabs.length + index)}
            closeHandler={() => (hasClose ? onClose(totalTabs - hiddenTabs.length + index) : null)}
          />
        );
      })}
    </ExcessMenuContainer>
  );
};

const ExcessTabDropdown = props => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [triggerMenu, setTriggerMenu] = useState(false);
  const inputRef = useRef();

  // Debounce
  useEffect(() => {
    if (triggerMenu) {
      setMenuIsOpen(true);
      return undefined;
    }
    const handler = setTimeout(() => {
      setMenuIsOpen(triggerMenu);
    }, 500);
    return () => clearTimeout(handler);
  }, [triggerMenu]);
  return (
    <ExcessIconContainer
      onMouseEnter={() => setTriggerMenu(true)}
      onMouseLeave={() => setTriggerMenu(false)}
    >
      <ExcessEllipsis>
        <Text>•••</Text>
      </ExcessEllipsis>
      <div style={{ position: 'relative' }}>
        {menuIsOpen ? <ExcessMenu {...props} inputRef={inputRef} /> : null}
      </div>
    </ExcessIconContainer>
  );
};

const sumTabWidths = tabSizes => Object.keys(tabSizes).reduce((acc, el) => {
  if (tabSizes[el]) {
    return acc + tabSizes[el];
  }
  return acc;
}, 0);

const CustomTab = props => {
  const {
    tabs,
    onChange,
    activeTab,
    onClose,
    renderMethod,
    hasAddButton,
    onAdd,
  } = props;
  const [tabSizes, setTabSizes] = useState({});
  const [sumOfWidths, setSumOfWidths] = useState(null);
  const [currFullWidth, setFullWidth] = useState(null);
  const [hiddenTabs, setHiddenTabs] = useState([]);

  useEffect(() => {
    const tabSizeKeys = Object.keys(tabSizes);
    const newTabSizes = { ...tabSizes };
    if (tabSizeKeys.length > tabs.length) {
      // Remove the tab size from the array

      for (let i = 0; i < tabSizeKeys.length; i++) {
        if (!tabs.find(el => el.id === tabSizeKeys[i])) {
          delete newTabSizes[tabSizeKeys[i]];
        }
      }
      setTabSizes(newTabSizes);
    }
    setSumOfWidths(sumTabWidths(newTabSizes));
  }, [tabs]);

  useEffect(() => {
    if (!currFullWidth) {
      return;
    }

    let widthCutoff;
    let widthAcc = 0;
    const toHide = [];
    for (widthCutoff = 0; widthCutoff < tabs.length; widthCutoff++) {
      widthAcc += tabSizes[tabs[widthCutoff].id];
      if (currFullWidth - 30 < widthAcc) {
        toHide.push(tabs[widthCutoff]);
      }
    }
    setHiddenTabs(toHide);
  }, [currFullWidth, sumOfWidths]);

  const tellWidthHandler = (width, index) => {
    if (tabSizes[index] !== width) {
      const newTabSizes = tabSizes;
      newTabSizes[index] = width;
      setSumOfWidths(sumTabWidths(newTabSizes));
      setTabSizes(newTabSizes);
    }
  };

  return (
    <div>
      <TabTileContainer>
        <ReactResizeDetector handleWidth>
          {({ width }) => {
            if (width) {
              if (width !== currFullWidth) {
                setFullWidth(width);
              }
            }
            return (
              <>
                {renderTabs(
                  tabs,
                  onChange,
                  onClose,
                  activeTab,
                  tellWidthHandler,
                  tabSizes,
                  hiddenTabs,
                )}
              </>
            );
          }}
        </ReactResizeDetector>
        {hasAddButton && <AddIcon size={12} onClick={onAdd} />}
        {hiddenTabs.length ? (
          <ExcessTabDropdown
            hiddenTabs={hiddenTabs}
            activeTab={activeTab}
            onChange={onChange}
            totalTabs={tabs.length}
            onClose={onClose}
          />
        ) : null}
      </TabTileContainer>
      <TabContentContainer>
        {renderMethod === 'single'
          ? singleRender(tabs, activeTab)
          : allRender(tabs, activeTab)}
      </TabContentContainer>
    </div>
  );
};

export default CustomTab;
