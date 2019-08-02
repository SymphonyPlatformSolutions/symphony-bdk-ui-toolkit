import { THEME_TYPES } from '../../../styles/colors';

export const getBackgroundColor = ({ theme }) => (theme.mode === THEME_TYPES.LIGHT
  ? theme.theme.colors.white
  : theme.theme.colors.grey);

export const getBoxShadow = ({ theme }) => ` 0 2px 4px 0 ${theme.theme.colors.lightgrey}`;
