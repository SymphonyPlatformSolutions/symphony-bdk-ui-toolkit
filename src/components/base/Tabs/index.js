import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Box from '../Box'
import { colors } from '../../../styles/colors';

const getTabHeaderBorder = () => '1px ' + colors.lightgrey + ' solid';
const getTabItemBorder = (activeTab, label) => (activeTab === label ? '4px ' + colors.blue : '0px ' + colors.lightgrey);
const getTabItemFontWeight = (activeTab, label) => (activeTab === label ? 'bold' : '100');
const getTabItemColor = (activeTab, label) => (activeTab === label ? colors.blue : colors.darkgrey);
const getTabItemAlign = (align) => (align==='right' ? 'right': 'left');
const getTabHeaderIndicatorMarginLeft = (index, align) => (align==='right' ? 'calc(100% - 150px)': index * 150 + 'px');

class Tabs extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[this.props.activeTab].props.label,
      activeTabIndex: this.props.activeTab,
      activeTabAlign: this.props.children[this.props.activeTab].props.align
    };
  }

  onClickTabItem = (label, index, align) => {
    this.setState({
      activeTab: label,
      activeTabIndex: index,
      activeTabAlign: align
    });
  }

  render() {
    const {
      onClickTabItem,
      props: {
        children,
        ...rest
      },
      state: {
        activeTab,
        activeTabIndex,
        activeTabAlign
      }
    } = this;

    return (
      <BaseTabs {...rest}>
        <Box horizontal>
          <TabHeader>
            {children.map((child, index) => {
              const { label, align } = child.props;
              return (
                <TabHeaderItem key={label} label={label} activeTab={activeTab} align={align}
                  onClick={() => onClickTabItem(label, index, align)}>
                  <TabHeaderLabel label={label} activeTab={activeTab}>{label}</TabHeaderLabel>
                </TabHeaderItem>
              );
            })}
            <TabHeaderIndicator activeTabIndex={activeTabIndex} activeTabAlign={activeTabAlign}></TabHeaderIndicator>
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
}

Tabs.propTypes = {
  activeTab: PropTypes.number,
  children: PropTypes.node.isRequired,
};

Tabs.defaultProps = {
  activeTab: 0
};

export default Tabs;

const BaseTabs = styled.div.attrs({
})`
  margin-top: 0px;
  margin-bottom: 0px;
  width: 100%;
`;

const TabHeader = styled.ol.attrs({
})`
  padding-left: 0;
  width: 100%;
  border-bottom: ${p => getTabHeaderBorder()};
`;

const TabHeaderLabel = styled.span.attrs({
})`
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  font-weight: ${p => getTabItemFontWeight(p.activeTab, p.label)};
  line-height: 22px;
  cursor: pointer;
  color: ${p => getTabItemColor(p.activeTab, p.label)};
`;

const TabHeaderItem = styled.li.attrs({
})`
  display: inline-block;
  width: 150px;
  list-style: none;
  margin-bottom: -1px;
  padding: 0 0.75rem 17px 0.75rem;
  border-bottom: 0px;
  text-align: ${p => getTabItemAlign(p.align)};
  float: ${p => getTabItemAlign(p.align)};
`;

const TabHeaderIndicator = styled.div`
  width: 150px;
  height: 3px;
  display: absolute;
  background: ${colors.blue};
  margin-top: 38px;
  margin-left: ${p => getTabHeaderIndicatorMarginLeft(p.activeTabIndex, p.activeTabAlign)};

  -webkit-transition: margin 0.5s ease;
  transition: margin 0.5s ease;
`;

//${p => getTabItemBorder(p.activeTab, p.label)} solid
