import React from 'react';
import PropTypes from 'prop-types';

class TableHeader extends React.PureComponent {
  render() {
    const {
      header, color, children, align, className,
    } = this.props;

    if (header) {
      return (
        <thead
          align={align}
          className={className || `table-group table-group--${color}`}
        >
          <tr>
            {
              header.map(item => (
                <th key={item.toString()}>{
                  typeof item === 'string'
                    ? item
                    : item && item()
                }
                </th>
              ))
            }
          </tr>
        </thead>
      );
    }

    // Usable when Table Header Should have Component
    return (
      <thead
        align={align}
        className={className || `table-group table-group--${color}`}
      >{children}
      </thead>
    );
  }
}

TableHeader.propTypes = {
  header: PropTypes.array,
  align: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
};

TableHeader.defaultProps = {
  header: undefined,
  children: undefined,
  className: undefined,
  align: undefined,
  color: undefined,
};

export default TableHeader;
