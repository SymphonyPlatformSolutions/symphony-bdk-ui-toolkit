import { THEME_TYPES } from '../../../styles/colors';

const getThemedBorderColor = ({ theme, inputState, disabled }) => {
  if (inputState === 'error') {
    return theme.theme.danger;
  }
  if (theme.mode === THEME_TYPES.DARK) {
    return '#6f747c';
  }

  return theme.theme.darkgrey;
};

export const getColor = ({ theme, inputState }) => (inputState === 'error'
  ? theme.theme.danger
  : theme.mode === THEME_TYPES.DARK
    ? theme.theme.basegrey
    : theme.theme.darkaccent);
export const getPlaceholderColor = ({ theme, inputState }) => (inputState === 'error' ? theme.theme.danger : theme.theme.darkgrey);

export const getBorderColor = props => getThemedBorderColor(props);
export const getBackgroundColor = ({ theme, disabled }) => (theme.mode === THEME_TYPES.DARK
  ? '#2F3237'
  : disabled
    ? theme.theme.grey
    : '#fff');
export const getPadding = ({ copyInput, textArea }) => (copyInput ? '0 3.75rem' : textArea ? '8px 8px' : '0 8px');
export const getWidth = ({ copyInput }) => '-webkit-fill-available';
export const getInputColor = ({ theme, disabled }) => (disabled ? theme.theme.grey : theme.theme.primary);
export const getInputFocusBorderColor = ({ theme, inputState }) => (inputState === 'error' ? theme.theme.danger : theme.theme.primary);
