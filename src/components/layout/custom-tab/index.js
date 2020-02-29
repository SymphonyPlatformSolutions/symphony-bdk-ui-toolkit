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
  margin-top: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const TabTileContainer = styled.div`
  display: flex;
`;

const TabTitleComponent = ({ title, tellWidthHandler }) => {
  const titleRef = useRef();
  // const [isSquished, setIsSquished] = useState(false);
  const [currWidth, setCurrWidth] = useState(null);
  useEffect(() => {
    tellWidthHandler(currWidth);
  }, [currWidth]);

  return (
    <>
      <TabTitle ref={titleRef}>
        <ReactResizeDetector handleWidth>
          {({ width }) => {
            // if (titleRef.current) {
            //   if (Math.ceil(width) < titleRef.current.scrollWidth) {
            //     setIsSquished(true);
            //   } else if (isSquished) {
            //     setIsSquished(false);
            //   }
            // }
            if (width !== currWidth) {
              setCurrWidth(width);
            }
            return <>{title}</>;
          }}
        </ReactResizeDetector>
      </TabTitle>
    </>
  );
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
    <StyledTab
      onClick={isActive ? null : clickHandler}
      isActive={isActive}
      onMouseDown={tabClickHandler}
    >
      {TabComponent ? (
        <TabComponent {...props} />
      ) : (
        <TabTitleComponent title={title} tellWidthHandler={tellWidthHandler} />
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
    </StyledTab>
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
  parentWidth,
  tellWidthHandler,
) => (
  <TabLineup>
    <ReactResizeDetector handleWidth>
      {({ width }) => {
        if (parentWidth) {
          const a = 0;
        }
        return (
          <>
            {tabs.map((el, index) => {
              const { hasClose = true } = el;

              return (
                <Tab
                  {...el}
                  tellWidthHandler={(thisTabWidth) => tellWidthHandler(thisTabWidth, index)}
                  isActive={index === activeTab}
                  hasClose={hasClose}
                  key={`tab_${index}`}
                  clickHandler={() => onChange(index)}
                  closeHandler={() => (hasClose ? onClose(index) : null)}
                />
              );
            })}
          </>
        );
      }}
    </ReactResizeDetector>
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
  const [isSquished, setIsSquished] = useState(false);
  const [tabSizes, setTabSizes] = useState([]);
  const [hiddenTabs, setHiddenTabs] = useState([]);

  useEffect(() => {
    setTabSizes([]);
  }, [tabs]);

  console.log('TABSIZES', tabSizes);

  const tellWidthHandler = (width, index) => {
    if (tabSizes[index] !== width) {
      const newTabSizes = tabSizes;
      newTabSizes[index] = width;
      setTabSizes(newTabSizes);
    }
    // console.log('GOT', width, 'FOR TAB', index);
  };

  return (
    <div>
      <TabTileContainer>
        <ReactResizeDetector handleWidth>
          {({ width }) => (
            <>
              {renderTabs(
                tabs,
                onChange,
                onClose,
                activeTab,
                width,
                tellWidthHandler,
              )}
            </>
          )}
        </ReactResizeDetector>
        {hasAddButton && <AddIcon size={12} onClick={onAdd} />}
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
