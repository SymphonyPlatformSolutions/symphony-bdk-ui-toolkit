import React, { useState, useEffect, useRef } from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import { withTheme } from 'styled-components';
import Tabs from 'react-responsive-tabs';
import {
  StyledPanelContainer,
  RRTStyleOverride,
  TabHeader,
  CloseIconWrapper,
  AddTabIcon,
  IconContainer,
  EditTabTitleInput,
} from './theme';

import 'react-responsive-tabs/styles.css';
import { CloseIcon } from '../../..';
import { NoOp } from '../../../utils/helpers';
import Text from '../text';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const AddTabButton = props => {
  const { onClick } = props;

  return (
    <IconContainer onClick={onClick}>
      <AddTabIcon>
        <Text isTitle style={{ fontWeight: 'normal', marginTop: '2px' }}>+</Text>
      </AddTabIcon>
    </IconContainer>
  );
};

const TabTitle = (props) => {
  const {
    TitleComponent, theme, removable, handleRemove,
    title, tabIndex, changeTitleHandler,
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [typedValue, setTypedValue] = useState(title);

  const resetInput = (forceResest) => {
    setIsEditing(false);
    if (typedValue && !forceResest) {
      changeTitleHandler(typedValue);
    } else {
      setTypedValue(title);
    }
  };

  const keyDownHandler = ({ keyCode }) => {
    if (keyCode === ENTER_KEY) {
      resetInput();
    }
    if (keyCode === ESCAPE_KEY) {
      resetInput(true);
    }
  };

  const handleType = (e) => {
    setTypedValue(e.target.value);
  };

  function renderTabTitle() {
    if (isEditing) {
      return (
        <EditTabTitleInput
          onBlur={() => resetInput()}
          value={typedValue}
          placeholder={title}
          onKeyDown={keyDownHandler}
          onChange={handleType}
        />
      );
    }
    if (TitleComponent) {
      return <TitleComponent>{title}</TitleComponent>;
    }
    return <Text>{title}</Text>;
  }

  if (removable) {
    return (
      <TabHeader onDoubleClick={() => setIsEditing(true)} editing={isEditing}>
        {renderTabTitle()}
        <CloseIconWrapper onMouseDown={handleRemove(tabIndex)}>
          <CloseIcon size={10} color={theme.colors.secondary_300} />
        </CloseIconWrapper>
      </TabHeader>
    );
  }

  return (
    <TabHeader onDoubleClick={() => setIsEditing(true)} editing={isEditing}>
      {renderTabTitle()}
    </TabHeader>
  );
};

TabTitle.propTypes = {
  TitleComponent: PropTypes.node,
};
const DynamicTabs = ({
  theme,
  tabs,
  isResponsive,
  onRemove,
  responsiveBreakpoint,
  wrapTabs,
  showSelectedTabIndicator,
  tabsRemovable,
  activeTab,
  onChange,
  hasAddButton,
  onCreate,
  AddTabComponent,
  changeTitleHandler,
}) => {
  function renderAddTabComponent() {
    if (AddTabComponent) {
      return <AddTabComponent onClick={onCreate} />;
    }
    return <AddTabButton onClick={onCreate} />;
  }
  const [currentTabs, setCurrentTabs] = useState(tabs);
  const [mkey, setMkey] = useState(0);

  const handleRemove = tabIndex => e => {
    e.stopPropagation();
    onRemove(tabIndex);
  };

  useEffect(() => {
    const newTabs = tabs.map((tab, index) => {
      const decoratedTitle = (
        <TabTitle
          title={tab.title}
          TitleComponent={tab.TitleComponent}
          theme={theme}
          tabIndex={index}
          key={tab.key}
          handleRemove={handleRemove}
          removable={tabsRemovable}
          changeTitleHandler={newTitle => changeTitleHandler(newTitle, index)}
        />
      );

      tab.title = decoratedTitle;
      return tab;
    });
    if (hasAddButton) {
      newTabs.push({
        title: renderAddTabComponent(),
        body: null,
        tabClassName: 'RRT__add-tab',
      });
    }
    setCurrentTabs(newTabs);
    setMkey(mkey + 1);
  }, [tabs, activeTab]);

  useEffect(() => {
    setMkey(mkey + 1);
  }, [activeTab]);

  return (
    <StyledPanelContainer key={mkey} theme={theme}>
      <RRTStyleOverride theme={theme} />
      <Tabs
        items={currentTabs}
        onChange={onChange}
        showMore={wrapTabs}
        transformWidth={responsiveBreakpoint}
        transform={isResponsive}
        showInkBar={showSelectedTabIndicator}
        selectedTabKey={activeTab}
      />
    </StyledPanelContainer>
  );
};

DynamicTabs.propTypes = {
  theme: PropTypes.shape({
    mode: PropTypes.string,
    colors: arrayOf(PropTypes.object),
  }).isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOf([PropTypes.node, PropTypes.string]),
      getContent: PropTypes.func,
      key: PropTypes.number,
    }),
  ),
  onRemove: PropTypes.func,
  isResponsive: PropTypes.bool,
  responsiveBreakpoint: PropTypes.number,
  wrapTabs: PropTypes.bool,
  showSelectedTabIndicator: PropTypes.bool,
  tabsRemovable: PropTypes.bool,
  activeTab: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  hasAddButton: PropTypes.bool,
  onCreate: PropTypes.func,
  AddTabComponent: PropTypes.node,
  changeTitleHandler: PropTypes.func,
};

DynamicTabs.defaultProps = {
  tabs: [],
  onRemove: NoOp,
  isResponsive: false,
  responsiveBreakpoint: 1400,
  wrapTabs: true,
  showSelectedTabIndicator: false,
  tabsRemovable: false,
  activeTab: 0,
  hasAddButton: null,
  onCreate: null,
  AddTabComponent: null,
  changeTitleHandler: null,
};

export default withTheme(DynamicTabs);
