import { darken } from 'polished';
import { THEME_TYPES } from '../../../styles/colors';


const getThemedBorderColor = ({ theme, inputState, disabled }) => {
  const border = {
    initial: darken(0.1, theme.theme.grey),
    modified: theme.theme.colors.darkgrey,
    error: theme.theme.danger,
  };
  return disabled ? theme.theme.grey : border[inputState];
};


export const getColor = ({ theme, inputState }) => (inputState === 'error'
  ? theme.theme.danger
  : (theme.mode === THEME_TYPES.DARK
    ? theme.theme.colors.basegrey
    : theme.theme.colors.darkaccent)
);
export const getPlaceholderColor = ({ theme, inputState }) => (inputState === 'error' ? theme.theme.danger : theme.theme.colors.darkgrey);

export const getBorderColor = props => getThemedBorderColor(props);
export const getBackgroundColor = ({ theme }) => (theme.mode === THEME_TYPES.DARK ? '#2F3237' : 'transparent');
export const getPadding = ({ copyInput }) => (copyInput ? '3.75rem' : '.75rem');
export const getWidth = ({ copyInput }) => (copyInput ? 'calc(100% - 3rem)' : '100%');
export const getInputColor = ({ theme, disabled }) => (disabled
  ? theme.theme.colors.grey
  : theme.theme.primary);
export const getInputFocusBorderColor = ({ theme, inputState }) => (inputState === 'error'
  ? theme.theme.danger
  : theme.theme.primary);
