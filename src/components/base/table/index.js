import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import 'react-contexify/dist/ReactContexify.min.css';
import { contextMenu } from 'react-contexify';
import uuid from 'uuid';
import Tooltip from '../tooltip';
import Text from '../text';
import Box from '../box';
import {
  getStyleProps,
  generateContextMenu,
  EmptyTable,
  EmptyText,
  CellWrapper,
  MoreActionsIcon,
  MenuWrapper,
  getTheadStyle,
  SortingIcon,
  getPropsStyle,
  SearchBar,
  TableWrapper,
  getHeaderColumnTextStyle,
} from './theme';
import Loader from '../loader';

function filterSearchData(data, rowKeys, searchTerm) {
  return data.filter((row) => {
    for (let i = 0; i < rowKeys.length; i++) {
      if (typeof row[rowKeys[i]] === 'number') {
        return row[rowKeys[i]] === searchTerm;
      }
      if (typeof row[rowKeys[i]] !== 'string') {
        return false;
      }
      if (row[rowKeys[i]].toLowerCase().includes(searchTerm)) {
        return true;
      }
    }
    return false;
  });
}

const Table = ({
  data,
  columns,
  theme,
  loading,
  emptyMessage,
  searchable,
  resizable,
  maxHeight,
  ...rest
}) => {
  const [sorting, changeSorting] = useState([]);
  const [searchTerm, changeSearchTerm] = useState('');
  const [filteredData, changeData] = useState(data);
  // Search debouncing
  useEffect(() => {
    if (!searchTerm) {
      changeData(data);
      return () => {};
    }
    const handler = setTimeout(() => {
      changeData(filterSearchData(data, Object.keys(data[0]), searchTerm));
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm, data]);

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

  const openContextMenu = menuId => (e) => {
    const rtlEvent = Object.assign(
      {},
      {
        x: e.x - 180,
        y: e.y,
        clientX: e.clientX - 180,
        clientY: e.clientY,
        stopPropagation: () => {
          e.stopPropagation();
        },
      },
    );
    contextMenu.show({ id: menuId, event: rtlEvent });
  };

  const customColumns = columns.map((el) => {
    const parsedEl = Object.assign({}, el);

    if (parsedEl.hasActions) {
      parsedEl.Cell = ({ original }) => {
        const hasActions = original.actionsMenu && original.actionsMenu.length;
        const menuId = uuid.v1();
        return hasActions ? (
          <MenuWrapper type="flat">
            <MoreActionsIcon onClick={openContextMenu(menuId)} />
            {generateContextMenu(theme, menuId, original)}
          </MenuWrapper>
        ) : null;
      };

      return parsedEl;
    }

    if (typeof parsedEl.Header === 'string') {
      const stringHeader = parsedEl.Header.slice();
      parsedEl.Header = ({ column }) => (
        <CellWrapper type="flat">
          <Box horizontal space={5}>
            <Text
              type="primary"
              isTitle
              size="tiny"
              style={getHeaderColumnTextStyle(theme)}
            >
              {stringHeader}
            </Text>
            {parsedEl.tooltip && <Tooltip>{parsedEl.tooltip}</Tooltip>}
            {el.sortable !== false && <SortingIcon sorting={sorting} columnId={column.id} theme={theme} />}
          </Box>
        </CellWrapper>
      );
    }

    if (!parsedEl.Cell) {
      parsedEl.Cell = props => (
        <CellWrapper type="flat">
          <Text type="primary" size="small">
            {props.value}
          </Text>
        </CellWrapper>
      );
    } else {
      const OldCell = parsedEl.Cell;
      parsedEl.Cell = args => (
        <CellWrapper type="flat">{OldCell(args)}</CellWrapper>
      );
    }

    return parsedEl;
  });

  return (
    <div>
      <Box type="flat">
        {searchable && (
        <SearchBar value={searchTerm} onChange={changeSearchTerm} />
        )}
      </Box>
      <TableWrapper>
        <ReactTable
          data={filteredData}
          width={100}
          minRows={1}
          columns={customColumns}
          loading={loading}
          resizable={resizable || false}
          showPagination={false}
          getTheadProps={(a) => {
            if (a.sorted !== sorting) {
              changeSorting(a.sorted);
            }
            return getTheadStyle(theme, searchable);
          }}
          getProps={() => getPropsStyle(maxHeight)}
          {...getStyleProps(theme)}
          {...rest}
        />
      </TableWrapper>
    </div>
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
};

Table.defaultProps = {
  data: null,
  columns: null,
  loading: false,
  searchable: false,
  emptyMessage: 'You have no content to display!',
  maxHeight: null,
};

export default withTheme(Table);
