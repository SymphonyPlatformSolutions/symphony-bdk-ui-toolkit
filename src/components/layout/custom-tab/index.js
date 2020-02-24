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

const TabTitleComponent = ({ title }) => {
  const titleRef = useRef();
  const [isSquished, setIsSquished] = useState(false);

  return (
    <>
      <TabTitle ref={titleRef}>
        <ReactResizeDetector handleWidth>
          {({ width }) => {
            if (titleRef.current) {
              if (Math.ceil(width) < titleRef.current.scrollWidth) {
                setIsSquished(true);
              } else if (isSquished) {
                setIsSquished(false);
              }
            }

            return <>{title}</>;
          }}
        </ReactResizeDetector>
      </TabTitle>
      {isSquished ? <div style={{ position: 'absolute' }}>SQUISHED</div> : null}
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

const renderTabs = (tabs, onChange, onClose, activeTab, parentWidth, isSquished, squishHandler) => (
  <TabLineup>
    <ReactResizeDetector handleWidth>
      {({ width }) => {
        // console.log('WIDTH', width);
        // console.log('PARENT WIDTH', parentWidth);
        if (parentWidth) {
          if (parentWidth < width && !isSquished) {
            // console.log('HERE BROTHER');
            squishHandler(true);
          } else if (parentWidth > width && isSquished) {
            squishHandler(false);
          }
        }
        return (
          <>
            {tabs.map((el, index) => {
              const { hasClose = true } = el;

              return (
                <Tab
                  {...el}
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
  const [numberOfTabs, setNumberOfTabs] = useState(tabs ? tabs.length : 0);
  const [hiddenTabs, setHiddenTabs] = useState([]);

  useEffect(() => {
    if (tabs) {
      if (tabs.length !== numberOfTabs) {
        setNumberOfTabs(tabs.length);
      }
    }
  }, [tabs]);

  console.log('Squished', isSquished);

  return (
    <div>
      <TabTileContainer>
        <ReactResizeDetector handleWidth>
          {({ width }) => (
            <>{renderTabs(tabs, onChange, onClose, activeTab, width, isSquished, setIsSquished)}</>
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
