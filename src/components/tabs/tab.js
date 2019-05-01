import React from 'react';
import PropTypes from 'prop-types';

class Tab extends React.Component {
  changeTab = () => {
    const { title, changeTab } = this.props;

    changeTab(title);
  }

  render() {
    const { title, activeTab } = this.props;

    return (
      <li
        role="presentation"
        onKeyPress={this.handleKeyPress}
        onClick={this.changeTab}
        className={
          activeTab === title
            ? 'tab__item tab__item--active'
            : 'tab__item'
        }
      >
        {title}
      </li>
    );
  }
}

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired,
  activeTab: PropTypes.any.isRequired,
};

export default Tab;
