import { THEME_TYPES } from '../../../styles/colors';

const getThemedBorderColor = ({ theme, inputState }) => {
  if (inputState === 'error') {
    return theme.colors.danger;
  }

  return theme.colors.bordergrey;
};

export const getColor = ({ theme, inputState }) => (inputState === 'error'
  ? theme.colors.danger
  : theme.mode === THEME_TYPES.DARK
    ? theme.colors.basegrey
    : theme.colors.darkaccent);
export const getPlaceholderColor = ({ theme, inputState }) => (inputState === 'error' ? theme.colors.danger : theme.colors.darkgrey);

export const getBorderColor = props => getThemedBorderColor(props);
export const getBackgroundColor = ({ theme, disabled }) => (theme.mode === THEME_TYPES.DARK
  ? theme.colors.inputgrey
  : disabled
    ? theme.colors.grey
    : theme.colors.white);
export const getPadding = ({ copyInput, textArea }) => (copyInput ? '0 3.75rem' : textArea ? '8px 8px' : '0 8px');
export const getWidth = ({ copyInput }) => '-webkit-fill-available';
export const getInputColor = ({ theme, disabled }) => (disabled ? theme.colors.grey : theme.colors.primary);
export const getInputFocusBorderColor = ({ theme, inputState }) => (inputState === 'error' ? theme.colors.danger : theme.colors.primary);
export const getLineColor = ({ theme, disabled }) => (disabled
  ? theme.colors.darkgrey
  : theme.colors.textcolor
);
