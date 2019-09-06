import React from 'react';
import { withTheme } from 'styled-components';
import ReactDataGrid from 'react-data-grid';
import PropTypes from 'prop-types';
import Text from '../text';
import {
  CellContainer,
  GridStyleWrapper,
} from './theme';

const DataGrid = (
  {
    rowGetter, data, columns, rowsCount,
    ...rest
  },
) => {
  let internalRowGetter = rowGetter;

  if (!rowGetter && data) {
    internalRowGetter = row => data[row];
  }

  const internalColumns = columns.map(el => ({
    headerRenderer: args => (
      <CellContainer>
        <Text
          px="0"
          py="0"
          mx="0"
          my="0"
          title
          size="small"
        >
          {args.column.name}
        </Text>
      </CellContainer>
    ),
    formatter: (args) => {
      const currentColumn = Object.keys(args.row)
        .find(key => args.row[key] === args.value);
      const error = args.row.error && currentColumn ? args.row.error[currentColumn] : false;
      return (
        <CellContainer error={error}>
          <Text
            px="0px"
            py="0px"
            type="primary"
            size="small"
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              color: error ? '#fff' : undefined,
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
};

DataGrid.defaultProps = {
  rowsCount: null,
  data: null,
  rowGetter: null,
};

export default withTheme(DataGrid);
