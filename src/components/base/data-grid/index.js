import React from 'react';
import styled, { withTheme } from 'styled-components';
import ReactDataGrid from 'react-data-grid';
import PropTypes from 'prop-types';
import Text from '../text';
import {
  getBorderColor,
  getHeaderFontColor,
  getHoverBackgroundColor,
} from './theme';

const overrides = {
  header: 'react-grid-Header',
  headerRow: 'react-grid-HeaderRow',
  headerCell: 'react-grid-HeaderCell',
  main: 'react-grid-Main',
  grid: 'react-grid-Grid',
  row: 'react-grid-Row',
  cell: 'react-grid-Cell',
  canvas: 'react-grid-Canvas',
};

export const GridStyleWrapper = styled.div.attrs(overrides)`
  .${overrides.headerCell} {
    display: flex;
    overflow: auto;
    font-family: 'Lato', sans-serif;
    background-color: rgba(0,0,0,0);
    border: 0;
  }

  .${overrides.headerRow} {
    overflow: hidden;
    border: 0;

    & > div {
      color: ${({ theme }) => getHeaderFontColor(theme)};;
      background-color: ${({ theme }) => getBorderColor(theme)};
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
  }

  .${overrides.main} {
    outline: none;
    background-color: rgba(0,0,0,0);
  }

  .${overrides.grid} {
    border: 0;
    background-color: rgba(0,0,0,0);
  }

  .${overrides.header} {
    border: none;
    box-shadow: none;
    background-color: rgba(0,0,0,0);
  }

  .${overrides.row} {
    border: 2px solid ${({ theme }) => getBorderColor(theme)};
    border-top: none;
    &:hover {
      background-color: ${({ theme }) => getHoverBackgroundColor(theme)} !important;
    }
  }

  .${overrides.cell} {
    background-color: rgba(0,0,0,0) !important;
    border: 0;

    &__value {
      overflow: inherit !important;
    }

    &:hover {
      background-color: rgba(0,0,0,0) !important;
    }
  }

  .${overrides.canvas} {
    background-color: rgba(0,0,0,0);
    border: 0;
    overflow: auto !important;
  }

  width: 100%;
`;

const CellContainer = styled.div`
  display: flex;
`;

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
