import { lighten } from 'polished';

export const getBackgroundColor = ({ theme, isChecked, disabled }) => (
  isChecked
    ? disabled ? theme.theme.darkgrey : theme.theme.secondary
    : disabled ? theme.theme.grey
      : lighten(0.1, theme.theme.grey)
);
