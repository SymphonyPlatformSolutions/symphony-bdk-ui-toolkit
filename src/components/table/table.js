import React from 'react';
import PropTypes from 'prop-types';

class Table extends React.PureComponent {
  render() {
    const {
      children, className, isLoading, emptyMessage,
      LoadingComponent,
    } = this.props;
    const headerIndex = 0;
    const bodyIndex = 1;
    const footerIndex = 2;

    if (isLoading) {
      return (
        <div className="empty-table">
          <LoadingComponent />
        </div>
      );
    }

    if (!children[bodyIndex] || !children[bodyIndex].length) {
      return (
        <div className="empty-table empty-table__color">
          <span>{emptyMessage}</span>
        </div>
      );
    }

    return (
      <table className={className || 'table'}>
        {children[headerIndex]}
        <tbody>
          {children[bodyIndex]}
        </tbody>
        {children[footerIndex]}
      </table>
    );
  }
}

Table.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  emptyMessage: PropTypes.string,
  isLoading: PropTypes.bool,
  LoadingComponent: PropTypes.func,
};

Table.defaultProps = {
  className: undefined,
  emptyMessage: undefined,
  isLoading: undefined,
  LoadingComponent: undefined,
};

export default Table;
