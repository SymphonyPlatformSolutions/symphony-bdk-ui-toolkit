import { darken, lighten } from 'polished';
import { THEME_TYPES } from '../../../styles/colors';

export const getBackgroundColor = ({ theme, isChecked, disabled }) => (
  isChecked
    ? disabled
      ? theme.theme.darkgrey
      : theme.theme.primary
    : disabled
      ? theme.theme.grey
      : theme.mode === THEME_TYPES.LIGHT
        ? darken(0.1, theme.theme.grey)
        : lighten(0.1, theme.theme.grey)
);
