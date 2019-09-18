import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import ReactTable from 'react-table';
import Tooltip from '../tooltip';
import 'react-table/react-table.css';
import 'react-contexify/dist/ReactContexify.min.css';
import {
  contextMenu,
} from 'react-contexify';
import Text from '../text';
import Box from '../box';
import uuid from 'uuid';

import {
  getStyleProps,
  generateContextMenu,
  EmptyTable,
  EmptyText,
  CellWrapper,
  MoreActionsIcon, MenuWrapper,
} from './theme';
import Loader from '../loader';


const Table = ({
  data, columns, theme, loading, emptyMessage,
  ...rest
}) => {
  if (loading) {
    return (
      <EmptyTable>
        <Loader type="v2" />
      </EmptyTable>
    );
  }

  if (!data || !data.length) {
    return <EmptyTable><EmptyText theme={theme}>{emptyMessage}</EmptyText></EmptyTable>;
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
        return hasActions
          ? (
            <MenuWrapper type="flat">
              <MoreActionsIcon onClick={openContextMenu(menuId)} />
              { generateContextMenu(theme, menuId, original) }
            </MenuWrapper>
          ) : null;
      };

      return parsedEl;
    }


    if (typeof parsedEl.Header === 'string') {
      if (parsedEl.tooltip) {
        parsedEl.Header = (
          <CellWrapper type="flat">
            <Box horizontal space={5}>
              <Text type="primary" size="small" style={{ fontWeight: 'bold' }}>{parsedEl.Header}</Text>
              <Tooltip>{parsedEl.tooltip}</Tooltip>
            </Box>
          </CellWrapper>
        );
      } else {
        parsedEl.Header = (
          <CellWrapper type="flat">
            <Text type="primary" size="small" style={{ fontWeight: 'bold' }}>{parsedEl.Header}</Text>
          </CellWrapper>
        );
      }
    }

    if (!parsedEl.Cell) {
      parsedEl.Cell = props => (
        <CellWrapper type="flat">
          <Text type="primary" size="small">{props.value}</Text>
        </CellWrapper>
      );
    } else {
      const OldCell = parsedEl.Cell;
      parsedEl.Cell = args => (
        <CellWrapper type="flat">
          { OldCell(args) }
        </CellWrapper>
      );
    }

    parsedEl.sortable = false;

    return parsedEl;
  });

  return (
    <ReactTable
      data={data}
      width={100}
      minRows={1}
      columns={customColumns}
      loading={loading}
      showPagination={false}
      {...getStyleProps(theme)}
      {...rest}
    />
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  theme: PropTypes.object.isRequired,
};

Table.defaultProps = {
  data: null,
  columns: null,
  loading: false,
  emptyMessage: 'You have no content to display!',
};

export default withTheme(Table);
