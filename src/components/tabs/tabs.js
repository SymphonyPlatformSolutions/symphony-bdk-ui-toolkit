import React from 'react';
import PropTypes from 'prop-types';

import Tab from './tab';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    const { currentTab } = this.props;

    this.state = {
      activeTab: !currentTab ? this.props.children[0].props.title : currentTab,
    };
  }

  changeTab = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {
    const { activeTab } = this.state;
    const { children, direction } = this.props;

    return (
      <div>
        <ul className={`tab tab--${direction}`}>
          {children.map((child) => {
            const { title } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={title}
                title={title}
                changeTab={this.changeTab}
              />
            );
          })}
        </ul>
        <div>
          {
            children.map(child => (
              child.props.title !== activeTab
                ? undefined
                : child.props.children
            ))
          }
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.string.isRequired,
  currentTab: PropTypes.string,
};

Tabs.defaultProps = {
  currentTab: undefined,
};

export default Tabs;
