import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Box from '../Box';
import {
  getHeaderIndicatorBackground,
  getTabHeaderBorder,
  getTabHeaderIndicatorMarginLeft,
  getTabItemAlign,
  getTabItemColor,
  getTabItemFontWeight,
} from './theme';

const BaseTabs = styled.div`
  margin-top: 0px;
  margin-bottom: 0px;
  width: 100%;
`;

const TabHeader = styled.ol`
  padding-left: 0;
  width: 100%;
  border-bottom: ${props => getTabHeaderBorder(props)};
`;

const TabHeaderLabel = styled.span`
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  font-weight: ${props => getTabItemFontWeight(props)};
  line-height: 22px;
  cursor: pointer;
  color: ${props => getTabItemColor(props)};
`;

const TabHeaderItem = styled.li`
  display: inline-block;
  width: 150px;
  list-style: none;
  margin-bottom: -1px;
  padding: 0 0.75rem 17px 0.75rem;
  border-bottom: 0px;
  text-align: ${props => getTabItemAlign(props)};
  float: ${props => getTabItemAlign(props)};
`;

const TabHeaderIndicator = styled.div`
  max-width: 150px;
  height: 3px;
  display: absolute;
  background: ${props => getHeaderIndicatorBackground(props)};
  margin-top: 38px;
  margin-left: ${props => getTabHeaderIndicatorMarginLeft(props)};

  -webkit-transition: margin 0.5s ease;
  transition: margin 0.5s ease;
`;


export default function Tabs(props) {
  const [activeTab, setActiveTab] = useState(props.children[props.activeTab].props.label);
  const [activeTabIndex, setActiveTabIndex] = useState(props.activeTab);
  const [activeTabAlign, setActiveTabAlign] = useState(props.children[props.activeTab].props.align);

  const onClickTabItem = (label, index, align) => {
    setActiveTab(label);
    setActiveTabIndex(index);
    setActiveTabAlign(align);
  };

  const {
    children,
    ...rest
  } = props;
  return (
    <BaseTabs {...rest}>
      <Box horizontal>
        <TabHeader>
          {children.map((child, index) => {
            const { label, align } = child.props;
            return (
              <TabHeaderItem
                key={label}
                label={label}
                activeTab={activeTab}
                align={align}
                onClick={() => onClickTabItem(label, index, align)}
              >
                <TabHeaderLabel label={label} activeTab={activeTab}>{label}</TabHeaderLabel>
              </TabHeaderItem>
            );
          })}
          <TabHeaderIndicator activeTabIndex={activeTabIndex} activeTabAlign={activeTabAlign} />
        </TabHeader>
      </Box>
      <Box horizontal>
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </Box>
    </BaseTabs>
  );
}

Tabs.propTypes = {
  activeTab: PropTypes.number,
  children: PropTypes.node.isRequired,
};

Tabs.defaultProps = {
  activeTab: 0,
};
