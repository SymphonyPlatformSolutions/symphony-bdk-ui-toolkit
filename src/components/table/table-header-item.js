import React from 'react';

const TableHeaderItem = props => (
  <th className={props.className || 'table-header-cell'}>
    <div className="table-header-content">
      { props.children }
    </div>
  </th>
);

export default TableHeaderItem;
