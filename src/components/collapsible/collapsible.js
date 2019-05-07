import React from 'react';
import PropTypes from 'prop-types';

export default class Collapsible extends React.PureComponent {
  render() {
    const {
      title, Content, contentProps, isOpen, toggleOpen,
    } = this.props;

    return (
      <div className="collapsible">
        <div
          role="button"
          tabIndex={0}
          onKeyPress={this.handleKeyPress}
          className="collapsible__header"
          onClick={toggleOpen}
        >
          <h2 className="collapsible__title">{title}</h2>
          <div className={`collapsible__chevron ${isOpen ? 'collapsible__chevron--open' : ''}`}>
            <i className="fas fa-chevron-right" />
          </div>
        </div>
        {isOpen ? <div><Content {...contentProps} /></div> : null}
      </div>
    );
  }
}

Collapsible.propTypes = {
  title: PropTypes.string,
  Content: PropTypes.func.isRequired,
  contentProps: PropTypes.object,
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func.isRequired,
};

Collapsible.defaultProps = {
  title: '',
  contentProps: {},
  isOpen: false,
};
