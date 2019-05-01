import React from 'react';

const TableRow = props => (
  <tr className={props.className || ''}>{props.children}</tr>
);

export default TableRow;
