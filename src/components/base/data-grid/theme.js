import styled from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';
import Box from '../box';

const getBorderColor = theme => (theme.mode === THEME_TYPES.DARK ? '#2F3237' : '#f6f6f6');
const getHeaderFontColor = theme => (theme.mode === THEME_TYPES.DARK ? '#fff ' : '#4d4d4d');
const getHoverBackgroundColor = theme => (theme.mode === THEME_TYPES.DARK ? '#32363b' : '#f9f9f9');
const getErrorBarColor = theme => (theme.mode === THEME_TYPES.DARK ? 'rgba(247, 74, 111, 0.62)' : 'rgba(213, 9, 53, 0.4)');

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
    padding: 0;
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
    padding: 0;

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

export const CellContainer = styled(Box)`
  background-color: ${({ error, theme }) => (error ? `${getErrorBarColor(theme)} !important` : undefined)};
  display: flex;
  height: 100%;
  justify-content: center;
  padding-left: 10px;
`;
