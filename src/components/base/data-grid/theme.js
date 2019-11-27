import styled from 'styled-components';
import Box from '../box';

const getBorderColor = theme => theme.colors.grey_100;
const getHeaderFontColor = theme => theme.colors.grey_700;
const getHoverBackgroundColor = theme => theme.colors.grey_200;

const getErrorBarColor = theme => (theme.colors.error_300);

const overrides = {
  header: 'react-grid-Header',
  headerRow: 'react-grid-HeaderRow',
  headerCell: 'react-grid-HeaderCell',
  main: 'react-grid-Main',
  grid: 'react-grid-Grid',
  row: 'react-grid-Row',
  cell: 'react-grid-Cell',
  cellValue: 'react-grid-Cell__value',
  canvas: 'react-grid-Canvas',
};

export const GridStyleWrapper = styled.div.attrs(overrides)`
  .${overrides.headerCell} {
    display: flex;
    overflow: auto;
    background-color: rgba(0,0,0,0);
    border: 0;
    padding: 0;
  }

  .${overrides.headerRow} {
    overflow: hidden;
    border: 0;

    & > div {
      color: ${({ theme }) => getHeaderFontColor(theme)};
      background-color: ${({ theme }) => getBorderColor(theme)};
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
  .rdg-editor-container input.editor-main, select.editor-main {
    padding: 0;
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
    padding: 0;
    &-Cell:not(.editing) {
      color: red;
    }
    &__value {
      overflow: inherit !important;
      &:first-child {
        height: 100%;
      }
      & > div {
        height: 100% !important;
      }
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

export const CellContainer = styled(Box)`
  background-color: ${({ error, theme }) => (error ? `${getErrorBarColor(theme)} !important` : undefined)};
  color: ${({ error, theme }) => (error ? theme.colors.white : 'inherit')};
  display: flex;
  height: 100%;
  justify-content: center;
  padding-left: 10px;
`;
