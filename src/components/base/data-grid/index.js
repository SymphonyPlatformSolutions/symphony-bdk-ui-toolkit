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
  const internalColumns = columns.map((el) => {
    if (el.formatter) {
      return el;
    }
    return {
      ...el,
      formatter: ({ value }) => { // eslint-disable-line
        return (
          <CellContainer>
            <Text
              px="0px"
              py="0px"
              type="primary"
              size="small"
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {value}
            </Text>
          </CellContainer>
        );
      },
    };
  });

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
