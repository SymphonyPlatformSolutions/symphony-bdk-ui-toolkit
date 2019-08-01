import { darken } from 'polished';
import { THEME_TYPES } from '../../../styles/colors';


const getThemedBorderColor = ({ theme, inputState, disabled }) => {
  const border = {
    initial: darken(0.1, theme.theme.grey),
    modified: theme.theme.darkgrey,
    error: theme.theme.danger,
  };
  return disabled ? theme.theme.grey : border[inputState];
};


export const getColor = ({ theme }) => (theme.mode === THEME_TYPES.DARK ? '#F1F2F3' : '#25272A');
export const getPlaceholderColor = ({ theme }) => theme.theme.darkgrey;

export const getBorderColor = props => getThemedBorderColor(props);
export const getBackgroundColor = ({ theme }) => (theme.mode === THEME_TYPES.DARK ? '#2F3237' : 'transparent');
export const getPadding = ({ copyInput }) => (copyInput ? '3.75rem' : '.75rem');
export const getWidth = ({ copyInput }) => (copyInput ? 'calc(100% - 3rem)' : '100%');
