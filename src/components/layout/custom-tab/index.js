import React from 'react';
import styled from 'styled-components';
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
const TabLineup = styled.div`
  display: flex;
`;

const Tab = props => {
  const {
    title,
    clickHandler,
    hasClose,
    closeHandler,
    isActive,
    TabComponent,
  } = props;


  return (
    <StyledTab onClick={isActive ? null : clickHandler} isActive={isActive}>
      {TabComponent ? (
        <TabComponent {...props} />
      ) : (
        <TabTitle type="primary">{title}</TabTitle>
      )}
      {hasClose && (
        <div style={{ marginLeft: '6px' }}>
          <CloseButton size={10} style={{ outline: 'none' }} onMouseDown={closeHandler} />
        </div>
      )}
    </StyledTab>
  );
};

const TabContentContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.grey_200};
  padding: 16px 16px;
`;

const renderTabs = (tabs, onChange, onClose, activeTab) => tabs.map((el, index) => {
  const { hasClose = true } = el;

  return (
    <Tab
      {...el}
      isActive={index === activeTab}
      hasClose={hasClose}
      key={`tab_${index}`}
      clickHandler={() => onChange(index)}
      closeHandler={() => onClose(index)}
    />
  );
});

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

  return (
    <div>
      <TabLineup>
        {renderTabs(tabs, onChange, onClose, activeTab)}
        {hasAddButton && <AddIcon size={12} onClick={onAdd}>+</AddIcon>}
      </TabLineup>
      <TabContentContainer>
        {renderMethod === 'single'
          ? singleRender(tabs, activeTab)
          : allRender(tabs, activeTab)}
      </TabContentContainer>
    </div>
  );
};

export default CustomTab;