import React from 'react';
import { withTheme } from 'styled-components';
import ReactDataGrid from 'react-data-grid';
import PropTypes from 'prop-types';
import Text from '../../misc/text';
import Tooltip from '../../misc/tooltip';
import Box from '../../layout/box';
import {
  CellContainer,
  GridStyleWrapper,
} from './theme';

const DataGrid = (
  {
    rowGetter, data, columns, rowsCount,
    theme,
    ...rest
  },
) => {
  let internalRowGetter = rowGetter;

  if (!rowGetter && data) {
    internalRowGetter = row => data[row];
  }

  const internalColumns = columns.map(el => ({
    headerRenderer: (args) => {
      if (args.column.tooltip) {
        return (
          <CellContainer>
            <Box horizontal align="center" space={5}>
              <Text
                isTitle
                size="tiny"
              >
                {args.column.name}
              </Text>
              <Tooltip>{el.tooltip}</Tooltip>
            </Box>
          </CellContainer>
        );
      }
      return (
        <CellContainer>
          <Text
            isTitle
            size="tiny"
          >
            {args.column.name}
          </Text>
        </CellContainer>
      );
    },
    formatter: (args) => {
      const currentColumn = Object.keys(args.row)
        .find(key => args.row[key] === args.value);
      const error = args.row.error && currentColumn ? args.row.error[currentColumn] : false;
      return (
        <CellContainer error={error}>
          <Text
            size="small"
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              color: error ? theme.colors.white : undefined,
            }}
          >
            {args.value}
          </Text>
        </CellContainer>
      );
    },
    ...el,
  }));

  return (
    <GridStyleWrapper>
      <ReactDataGrid
        columns={internalColumns}
        rowGetter={internalRowGetter}
        rowsCount={rowsCount || data.length}
        {...rest}
      />
    </GridStyleWrapper>
  );
};

DataGrid.propTypes = {
  rowGetter: PropTypes.func,
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
  rowsCount: PropTypes.number,
  theme: PropTypes.object.isRequired,
};

DataGrid.defaultProps = {
  rowsCount: null,
  data: null,
  rowGetter: null,
};

export default withTheme(DataGrid);
