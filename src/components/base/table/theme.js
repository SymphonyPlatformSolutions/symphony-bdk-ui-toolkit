import { THEME_TYPES } from '../../../styles/colors';

export const getBorderColor = theme => (theme.mode === THEME_TYPES.DARK ? theme.colors.inputgrey : theme.colors.lightgrey);
export const getHeaderFontColor = theme => (theme.colors.textcolor);
export const getEmptyTableColor = theme => (theme.mode === THEME_TYPES.DARK ? theme.colors.inputgrey : theme.colors.lightgrey);
