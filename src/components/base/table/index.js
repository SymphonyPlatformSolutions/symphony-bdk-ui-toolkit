import React, { useState, useMemo } from 'react';
import {
  useTable, useSortBy, useBlockLayout,
} from 'react-table';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Loader from '../loader';
import {
  THead,
  THeadTh,
  TBodyTr,
  TBody,
  TBodyTd,
  StyledTable,
  THeadTr,
  EmptyTable,
  EmptyText,
  ALIGNMENTS,
} from './theme';
import {
  Cell,
  HeaderCell,
  SearchBar,
} from './components';

const searchFilterFunction = (row, searchValue) => {
  const keys = Object.keys(row);
  for (let i = 0; i < keys.length; i += 1) {
    if (typeof row[keys[i]] === 'string') {
      if (row[keys[i]].toLowerCase().includes(searchValue)) {
        return true;
      }
    }
    if (typeof row[keys[i]] === 'number') {
      if (row[keys[i]].toString().includes(searchValue)) {
        return true;
      }
    }
  }
  return false;
};

const executeSearch = (data, searchTerm) => {
  if (!searchTerm) {
    return data;
  }
  return data.filter(el => searchFilterFunction(el, searchTerm.toLowerCase()));
};

const Table = (props) => {
  const {
    data,
    columns,
    theme,
    maxHeight,
    loading,
    emptyMessage,
    searchable,
    Row,
    align,
    ...rest
  } = props;

  const [searchTerm, setSearchTerm] = useState('');

  const defaultColumn = {
    accessor: 'actionsMenu',
    minWidth: 30,
    width: 200,
    maxWidth: 400,
    Cell,
    Header: HeaderCell,
  };

  let filteredData;
  if (searchable) {
    filteredData = useMemo(() => executeSearch(data, searchTerm), [searchTerm, data]);
  } else {
    filteredData = data;
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: filteredData,
      defaultColumn,
    },
    useBlockLayout,
    useSortBy,
  );

  if (loading) {
    return (
      <EmptyTable>
        <Loader />
      </EmptyTable>
    );
  }

  if (!data || !data.length) {
    return (
      <EmptyTable>
        <EmptyText theme={theme}>{emptyMessage}</EmptyText>
      </EmptyTable>
    );
  }

  const prepareHeaderProps = (col) => {
    if (col.sortable === false) {
      return col.getHeaderProps();
    }
    return col.getHeaderProps(col.getSortByToggleProps());
  };

  return (
    <StyledTable {...getTableProps()} {...rest}>
      <THead>
        {searchable && <SearchBar theme={theme} executeFilter={setSearchTerm} />}
        {headerGroups.map(headerGroup => (
          <THeadTr {...headerGroup.getHeaderGroupProps()} align={align} style={{}}>
            {headerGroup.headers.map(column => (
              <THeadTh {...prepareHeaderProps(column)}>
                {column.render('Header')}
              </THeadTh>
            ))}
          </THeadTr>
        ))}
      </THead>
      <TBody {...getTableBodyProps()} maxHeight={maxHeight}>
        {rows.map((row) => {
          prepareRow(row);

          if (Row) { // Custom row
            return (
              <Row {...row.getRowProps()} {...row} align={align} style={{}}>
                {row.cells.map(cell => (
                  <TBodyTd {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TBodyTd>
                ))}
              </Row>
            );
          }
          return (
            <TBodyTr {...row.getRowProps()} align={align} style={{}}>
              {row.cells.map(cell => (
                <TBodyTd {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </TBodyTd>
              ))}
            </TBodyTr>
          );
        })}
      </TBody>
    </StyledTable>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  theme: PropTypes.object.isRequired,
  searchable: PropTypes.bool,
  maxHeight: PropTypes.string,
  align: PropTypes.oneOf(Object.keys(ALIGNMENTS)),
};

Table.defaultProps = {
  data: null,
  columns: null,
  loading: false,
  searchable: false,
  emptyMessage: 'You have no content to display!',
  maxHeight: null,
  align: 'center',
};

export default withTheme(Table);
