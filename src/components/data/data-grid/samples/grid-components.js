import React, { useState } from 'react';
import DataGrid from '../index';

const DATA = [{
  email: '4@domain.com',
  name: 'A',
  link: 'http://a.com',
  rowId: 1,
}, {
  email: '3@domain.com',
  name: 'B',
  link: 'http://b.com',
  rowId: 2,
}, {
  email: '2@domain.com',
  name: 'C',
  link: 'http://c.com',
  rowId: 3,
}, {
  email: '1@domain.com',
  name: 'D',
  link: 'http://d.com',
  rowId: 4,
}];

const ERROR_DATA = [{
  email: '4@domain.com',
  name: 'A',
  error: { email: true },
  link: 'http://a.com',
  rowId: 1,
}, {
  email: '3@domain.com',
  name: 'B',
  link: 'http://b.com',
  error: { link: true },
  rowId: 2,
}, {
  email: '2@domain.com',
  name: 'C',
  link: 'http://c.com',
  error: { name: true },
  rowId: 3,
}, {
  email: '1@domain.com',
  name: 'D',
  link: 'http://d.com',
  rowId: 4,
}];

const COLUMNS = [{
  name: 'Name',
  key: 'name',
  editable: true,
}, {
  name: 'Email',
  key: 'email',
  editable: true,
  tooltip: 'A grand set of details about this column. You can edit it too!',
}, {
  name: 'Link',
  key: 'link',
  editable: true,
}];

export const GridHandler = () => {
  const [list, setList] = useState(DATA);
  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    // update based on invite list
    const updatedList = [...list];

    for (let row = fromRow; row <= toRow; row++) {
      // get rowId from row at "display list"
      const { rowId } = list[row];

      // update using rowId
      const index = updatedList.findIndex(row => row.rowId === rowId);
      updatedList[index] = { ...list[index], ...updated };
    }
    setList(updatedList);
  };

  return (
    <DataGrid
      columns={COLUMNS}
      data={list}
      enableCellSelect
      rowGetter={row => list[row]}
      onGridRowsUpdated={onGridRowsUpdated}
    />
  );
};


export const GridWithError = () => {
  const [list, setList] = useState(ERROR_DATA);
  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    // update based on invite list
    const updatedList = [...list];

    for (let row = fromRow; row <= toRow; row++) {
      // get rowId from row at "display list"
      const { rowId } = list[row];

      // update using rowId
      const index = updatedList.findIndex(row => row.rowId === rowId);
      updatedList[index] = { ...list[index], ...updated };
    }
    setList(updatedList);
  };

  return (
    <DataGrid
      columns={COLUMNS}
      data={list}
      enableCellSelect
      rowGetter={row => list[row]}
      onGridRowsUpdated={onGridRowsUpdated}
    />
  );
};
