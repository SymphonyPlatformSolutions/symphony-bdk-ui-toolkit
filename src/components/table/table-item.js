import React from 'react';

const TableItem = props => (
  <td
    align={props.align}
    className={props.className || 'table__cell'}
  >{props.children}
  </td>
);

export default TableItem;
