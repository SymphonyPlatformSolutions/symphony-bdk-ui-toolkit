import { THEME_TYPES } from '../../../styles/colors';

export const getBorderColor = theme => (theme.mode === THEME_TYPES.DARK ? '#2F3237' : '#f6f6f6');
export const getHeaderFontColor = theme => (theme.mode === THEME_TYPES.DARK ? '#fff ' : '#4d4d4d');
export const getEmptyTableColor = theme => (theme.mode === THEME_TYPES.DARK ? '#2F3237' : theme.theme.lightgrey);
