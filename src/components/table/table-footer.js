import React from 'react';
import PropTypes from 'prop-types';

class TableFooter extends React.PureComponent {
  render() {
    const {
      children, color, cols, align, className,
    } = this.props;

    if (children.length > 1) {
      return (
        <tfoot
          align={align}
          className={className || `table-group table-group--${color}`}
        >
          {children}
        </tfoot>
      );
    }

    // Usable when Table Header Should have Component
    // Or need more items on Footer
    return (
      <tfoot
        align={align}
        className={className || `table-group table-group--${color}`}
      >
        <tr>
          <td colSpan={cols.toString()} className="table-header-cell">{ children }</td>
        </tr>
      </tfoot>
    );
  }
}

TableFooter.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  align: PropTypes.string,
  className: PropTypes.string,
  cols: PropTypes.number,
};

TableFooter.defaultProps = {
  align: undefined,
  className: undefined,
  cols: undefined,
};

export default TableFooter;
