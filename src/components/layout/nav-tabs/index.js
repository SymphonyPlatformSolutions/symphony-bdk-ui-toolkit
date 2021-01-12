import React, {
  useState, useEffect, createRef, useRef,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../box';
import Text from '../../misc/text';
import {
  getHeaderIndicatorBackground,
  getTabHeaderIndicatorMarginLeft,
  getHeaderIndicatorWidth,
  getTabItemAlign,
} from './theme';

const BaseTabs = styled.div`
  margin-top: 0px;
  margin-bottom: 0px;
  width: 100%;
`;

const TabHeader = styled.ol`
  padding-left: 0;
  width: 100%;
  margin-bottom: 20px;
`;

const TabHeaderLabel = styled(Text)`
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.grey_700 : theme.colors.grey_500)};
  transition: color 0.2s ease;
  &:hover {
    color: ${({ isSelected, theme }) => (isSelected ? undefined : theme.colors.grey_700)};
  }
  text-transform: uppercase;
`;

const separatorWidthInPx = 15;

const TabHeaderItem = styled.li`
  user-select: none;
  display: inline-block;
  list-style: none;
  margin-bottom: -1px;
  margin-right: ${separatorWidthInPx}px;
  border-bottom: 0px;
  text-align: ${props => getTabItemAlign(props)};
  float: ${props => getTabItemAlign(props)};
  &:hover {
    color: ${({ theme }) => theme.colors.primary_500}
  }
`;

const TabHeaderIndicator = styled.div`
  width: ${props => getHeaderIndicatorWidth(props)};
  height: 3px;
  display: absolute;
  background: ${props => getHeaderIndicatorBackground(props)};
  margin-top: 25px;
  margin-left: ${props => getTabHeaderIndicatorMarginLeft({ ...props, separatorWidthInPx })};
  transition-property: margin, width;
  transition-duration: .5s;
  transition-timing-function: ease;
`;

export default function NavTabs({ children, activeTab, ...rest }) {
  const childrenArray = React.Children.toArray(children);
  const elRef = useRef([...Array(childrenArray.length)].map(() => createRef()));
  const [currentRef, setCurrentRef] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(activeTab);
  const [activeTabAlign, setActiveTabAlign] = useState(childrenArray[activeTab].props.align);

  const onClickTabItem = (index, align) => {
    setActiveTabIndex(index);
    setActiveTabAlign(align);
  };

  useEffect(() => {
    let hasRefs = true;
    for (let i = 0; i < elRef.current.length; i++) {
      hasRefs = hasRefs && (elRef.current[i] !== undefined);
    }
    if (!hasRefs) return;
    setCurrentRef(elRef.current[activeTabIndex]);
  }, [elRef, activeTabIndex]);

  return (
    <BaseTabs {...rest}>
      <Box horizontal>
        <TabHeader>
          {childrenArray.map((child, index) => {
            const { label, align } = child.props;
            return (
              <TabHeaderItem
                key={label}
                ref={ref => elRef.current[index] = ref}
                align={align}
                onClick={() => onClickTabItem(index, align)}
              >
                <TabHeaderLabel isSelected={activeTabIndex === index}>{label}</TabHeaderLabel>
              </TabHeaderItem>
            );
          })}
          {currentRef && (
          <TabHeaderIndicator
            tabs={elRef.current}
            activeTabIndex={activeTabIndex}
            activeTabAlign={activeTabAlign}
          />
          )}
        </TabHeader>
      </Box>
      <Box vertical>
        {childrenArray.filter((child, index) => index === activeTabIndex).map((child) => child.props.children)}
      </Box>
    </BaseTabs>
  );
}

NavTabs.propTypes = {
  activeTab: PropTypes.number,
  children: PropTypes.node.isRequired,
};

NavTabs.defaultProps = {
  activeTab: 0,
};
