import { transparentize } from 'polished';
import { THEME_TYPES, colors } from '../../../styles/colors';

export const getBackgroundColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? colors.white
    : transparentize(0.9, colors.white));

export const getBoxShadowColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? transparentize(0.86, '#000')
    : theme.theme.grey
);

export const getBorderColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT ? theme.theme.gray : null
);
