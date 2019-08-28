import { THEME_TYPES } from '../../../styles/colors';

export const getBackgroundColor = theme => (theme.mode === THEME_TYPES.DARK ? '#676a70' : '#c0c1c3');
export const getTileColor = theme => (theme.mode === THEME_TYPES.DARK ? '#e3e5e8' : '#2f3237');
