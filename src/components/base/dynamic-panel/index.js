import React, {
  useState, useEffect, createRef, useRef,
} from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme, createGlobalStyle } from 'styled-components';
import Tabs from 'react-responsive-tabs';
import Box from '../box';
import Text from '../text';
import {
  getHeaderIndicatorBackground,
  getTabHeaderIndicatorMarginLeft,
  getHeaderIndicatorWidth,
  getTabItemAlign,
} from './theme';

import 'react-responsive-tabs/styles.css';
import { THEME_TYPES } from '../../..';


const StyledPanel = styled.div`
  border-radius: 2px;
  padding: 1px;
  border: ${({ theme }) => (theme.mode === THEME_TYPES.LIGHT ? `1px solid ${theme.colors.grey_100}` : '1px solid #494b4e7a')}
  width: 100%;
  box-shadow: ${({ theme }) => (theme.mode === THEME_TYPES.DARK ? '' : '0 1px 16px -6px rgba(0, 0, 0, 0.1)')};
`;

const GlobalStyle = createGlobalStyle`
  .RRT__removable {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .RRT__removable-icon {
    background-color: #f0f0f0;
    color: #868686;
    margin-left: 10px;
        font-size: larger;
    font-weight: 900;
    font-size: unset;
    width: 16px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center
  }
  .RRT__tab {
    border-color: transparent;
    margin-right: 1px;
    margin-top: 1px;
    border: none !important;
  }
  .RRT__tab--selected {
    margin-right: inherit;
    margin-top: inherit;
  }
  .RRT__tab--selected .RRT__removable-icon {
    position: relative !important;
    font-size: 1rem !important;
    right: 0 !important;
    top: 0 !important;
    margin-left: 0px;
  }
  .RRT__showmore {
    background: #eee;
    border: none !important;
    margin-top: 1px !important;
    cursor: pointer;
    z-index: 1;
    white-space: nowrap;
    position: relative;
    margin-left: 0px !important;
  }
  :focus {
    outline: 0;
  }
  .RRT__panel {
    border: none !important;
  }
`;
const presidents = [{ name: 'George Washington', biography: '...' }, { name: 'Theodore Roosevelt', biography: '...' }, { name: 'George Washington', biography: '...' }, { name: 'Theodore Roosevelt', biography: '...' }, { name: 'George Washington', biography: '...' }, { name: 'Theodore Roosevelt', biography: '...' }, { name: 'George Washington', biography: '...' }, { name: 'Theodore Roosevelt', biography: '...' }, { name: 'George Washington', biography: '...' }, { name: 'Theodore Roosevelt', biography: '...' }, { name: 'George Washington', biography: '...' }, { name: 'Theodore Roosevelt', biography: '...' }];

function getTabs() {
  return presidents.map((president, index) => ({
    title: president.name,
    getContent: () => president.biography,
    /* Optional parameters */
    key: index,
  }));
}


const DynamicPanel = ({
  theme,
  isResponsive,
  responsiveBreakpoint,
  wrapTabs,
  selectedTabRemovableOnly,
  showSelectedTabIndicator,
  tabsRemovable,
  activeTab,
}) => {
  const handleChange = (e) => {
    console.log('change');
    console.log(e);
  };

  const handleRemove = (e) => {
    console.log('remove');
    console.log(e);
  };
  return (
    <StyledPanel>
      <GlobalStyle />
      <Tabs
        onChange={handleChange}
        onRemove={handleRemove}
        items={getTabs()}
        showMore={wrapTabs}
        allowRemove={tabsRemovable}
        transformWidth={responsiveBreakpoint}
        transform={isResponsive}
        removeActiveOnly={selectedTabRemovableOnly}
        showInkBar={showSelectedTabIndicator}
        selectedTabKey={activeTab}
      />
    </StyledPanel>
  );
};

// DynamicPanel.propTypes = {
//   activeTab: PropTypes.number,
//   children: PropTypes.node.isRequired,
// };
//
DynamicPanel.defaultProps = {
  isResponsive: false,
  responsiveBreakpoint: 800,
  wrapTabs: true,
  showSelectedTabIndicator: false,
  tabsRemovable: true,
  selectedTabRemovableOnly: false,
  activeTab: 0,
};

export default withTheme(DynamicPanel);
