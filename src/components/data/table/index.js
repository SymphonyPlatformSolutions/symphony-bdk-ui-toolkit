import React, {
  useState, useMemo, useCallback, useRef,
} from 'react';
import { useTable, useSortBy, useBlockLayout } from 'react-table';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import { EmptyTable, EmptyText, TableScrollWrapper } from './theme';
import Loader from '../../misc/loader';
import TableElements, { ALIGNMENTS } from './components/table-elements';
import Cell from './components/cell';
import HeaderCell from './components/header-cell';
import SearchBar from './components/search-bar';
import ContextMenu from './components/context-menu';

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
  const tableRef = useRef();

  const defaultColumn = {
    accessor: 'actionsMenu',
    minWidth: 30,
    width: 200,
    maxWidth: 400,
    Cell,
    Header: HeaderCell,
  };

  const filteredData = useMemo(() => executeSearch(data, searchTerm), [
    searchTerm,
    data,
  ]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
  } = useTable(
    {
      getRowId: (elem => elem.id),
      columns,
      data: filteredData,
      defaultColumn,
    },
    useBlockLayout,
    useSortBy,
  );

  const renderEmptyTable = () => {
    if (loading) {
      return (
        <EmptyTable>
          <Loader />
        </EmptyTable>
      );
    }

    return (
      <EmptyTable>
        <EmptyText theme={theme}>{emptyMessage}</EmptyText>
      </EmptyTable>
    );
  };

  const prepareHeaderProps = (col) => {
    if (col.sortable === false) {
      return col.getHeaderProps();
    }
    return col.getHeaderProps(col.getSortByToggleProps());
  };

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];

      prepareRow(row);
      if (Row) {
        // Custom row
        return (
          <Row {...row.getRowProps({ style })} {...row} align={align} key={row.original.id}>
            {row.cells.map(cell => (
              <TableElements.TBodyTd {...cell.getCellProps()}>
                {cell.render('Cell')}
              </TableElements.TBodyTd>
            ))}
          </Row>
        );
      }
      return (
        <TableElements.TBodyTr {...row.getRowProps({ style })} align={align} key={row.original.id}>
          {row.cells.map(cell => (
            <TableElements.TBodyTd {...cell.getCellProps()}>
              {cell.render('Cell')}
            </TableElements.TBodyTd>
          ))}
        </TableElements.TBodyTr>
      );
    },
    [rows],
  );

  return (
    <TableScrollWrapper>
      <TableElements.StyledTable
        ref={tableRef}
        {...getTableProps()}
        totalWidth={totalColumnsWidth}
        {...rest}
      >
        <TableElements.THead>
          {searchable && (
            <SearchBar theme={theme} executeFilter={setSearchTerm} />
          )}
          {headerGroups.map((headerGroup) => {
            if (headerGroup.getHeaderGroupProps) {
              return (
                <TableElements.THeadTr
                  {...headerGroup.getHeaderGroupProps()}
                  align={align}
                  style={{}}
                >
                  {headerGroup.headers.map(column => (
                    <TableElements.THeadTh {...prepareHeaderProps(column)}>
                      {column.render('Header')}
                    </TableElements.THeadTh>
                  ))}
                </TableElements.THeadTr>
              );
            }
            return null;
          })}
        </TableElements.THead>
        <TableElements.TBody {...getTableBodyProps()}>
          {rows.length ? (
            <List
              height={!maxHeight ? rows.length * 35 + 1 : maxHeight}
              itemCount={rows.length}
              itemId={item => item.id}
              itemSize={35}
              width={() => (tableRef.current ? tableRef.current.offsetWidth : 10)}
            >
              {RenderRow}
            </List>
          ) : (
            renderEmptyTable()
          )}
        </TableElements.TBody>
      </TableElements.StyledTable>
    </TableScrollWrapper>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  theme: PropTypes.object.isRequired,
  searchable: PropTypes.bool,
  maxHeight: PropTypes.number,
  align: PropTypes.oneOf(Object.keys(ALIGNMENTS)),
  Row: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Table.defaultProps = {
  data: null,
  columns: null,
  loading: false,
  searchable: false,
  emptyMessage: 'You have no content to display!',
  maxHeight: null,
  align: 'center',
  Row: null,
};

export const TableComponents = {
  Cell,
  HeaderCell,
  SearchBar,
  ContextMenu,
};

export default withTheme(Table);
