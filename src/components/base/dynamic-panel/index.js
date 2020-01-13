import React, {
  useState, useEffect,
} from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import { withTheme } from 'styled-components';
import Tabs from 'react-responsive-tabs';
import {
  StyledPanelContainer,
  RRTStyleOverride,
  TabHeader,
  CloseIconWrapper,
} from './theme';

import 'react-responsive-tabs/styles.css';
import { CloseIcon } from '../../..';
import { NoOp } from '../../../utils/helpers';
import Text from '../text';

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
}) => {
  const [currentTabs, setCurrentTabs] = useState(tabs);
  const [currentTab, setCurrentTab] = useState(0);
  const [mkey, setMkey] = useState(0);

  const handleChange = (e) => {
    setCurrentTab(e);
  };
  const handleRemove = (tabIndex) => (e) => {
    e.stopPropagation();
    onRemove(tabIndex);
  };

  useEffect(() => {
    const newTabs = tabs.map((tab) => {
      let decoratedTitle;
      if (tabsRemovable) {
        decoratedTitle = (
          <TabHeader>
            <Text>{tab.title}</Text>
            <CloseIconWrapper onClick={handleRemove(tab.key)}>
              <CloseIcon size={10} color={theme.colors.secondary_300} />
            </CloseIconWrapper>
          </TabHeader>
        );
      } else {
        decoratedTitle = (
          <Text>
            {tab.title}
          </Text>
        );
      }
      tab.title = decoratedTitle;
      return tab;
    });

    setCurrentTabs(newTabs);
    setMkey(mkey + 1);
  }, [tabs, activeTab]);

  useEffect(() => {
    setCurrentTab(activeTab);
    setMkey(mkey + 1);
  }, [activeTab]);

  return (
    <StyledPanelContainer key={mkey} theme={theme}>
      <RRTStyleOverride theme={theme} />
      <Tabs
        items={currentTabs}
        onChange={handleChange}
        showMore={wrapTabs}
        transformWidth={responsiveBreakpoint}
        transform={isResponsive}
        showInkBar={showSelectedTabIndicator}
        selectedTabKey={currentTab}
      />
    </StyledPanelContainer>
  );
};

DynamicTabs.propTypes = {
  theme: PropTypes.shape({
    mode: PropTypes.string,
    colors: arrayOf(PropTypes.object),
  }).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.oneOf([PropTypes.node, PropTypes.string]),
    getContent: PropTypes.func,
    key: PropTypes.number,
  })),
  onRemove: PropTypes.func,
  isResponsive: PropTypes.bool,
  responsiveBreakpoint: PropTypes.number,
  wrapTabs: PropTypes.bool,
  showSelectedTabIndicator: PropTypes.bool,
  tabsRemovable: PropTypes.bool,
  activeTab: PropTypes.number,
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
};

export default withTheme(DynamicTabs);
