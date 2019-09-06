import { darken, lighten } from 'polished';
import { THEME_TYPES } from '../../../styles/colors';

export const getBackgroundColor = ({ theme, isChecked, disabled }) => (
  isChecked
    ? disabled
      ? theme.colors.darkgrey
      : theme.colors.primary
    : disabled
      ? theme.colors.grey
      : theme.mode === THEME_TYPES.LIGHT
        ? darken(0.1, theme.colors.grey)
        : lighten(0.1, theme.colors.grey)
);
