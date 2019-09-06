import { THEME_TYPES } from '../../../styles/colors';

export const getBackgroundColor = ({ theme, colorObject }) => {
  if (!colorObject) {
    return (theme.mode === THEME_TYPES.DARK ? '#676a70' : '#c0c1c3');
  }
  return colorObject.background;
};
export const getTileColor = ({ theme, colorObject }) => {
  if (!colorObject) {
    return (theme.mode === THEME_TYPES.DARK ? '#e3e5e8' : '#2F3237');
  }
  return colorObject.tile;
};
