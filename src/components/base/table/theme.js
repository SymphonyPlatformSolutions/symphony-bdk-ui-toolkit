import { THEME_TYPES } from '../../../styles/colors';
import styled from 'styled-components';

export const getBorderColor = theme => (theme.mode === THEME_TYPES.DARK ? theme.colors.inputgrey : theme.colors.lightgrey);
export const getHeaderFontColor = theme => (theme.colors.textcolor);
export const getEmptyTableColor = theme => (theme.mode === THEME_TYPES.DARK ? theme.colors.inputgrey : theme.colors.lightgrey);

export const getStyleProps = theme => ({
  getProps: () => ({
    style: {
      width: '100%',
      border: `2px solid ${getBorderColor(theme)}`,
      borderWidth: '2px 2px 0px 2px',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
    },
  }),
  getTheadProps: () => ({
    style: {
      backgroundColor: getBorderColor(theme),
      boxShadow: 'none',
      minHeight: '36px',
      padding: '5px 0px',
    },
  }),
  getTheadThProps: () => ({
    style: {
      borderRight: 'none',
    },
  }),
  getTrProps: () => ({
    style: {
    borderBottom: `1px solid ${getBorderColor(theme)}`,
    },
  }),
  getTdProps: () => ({
    style: {
      borderRight: 'none',
    },
  }),
});

export const ContextMenu = styled.div`
  width: 100px;
  border:  ${({ theme }) => `1px solid ${getBorderColor(theme)}`};
  background: white;
  position: absolute;
`
