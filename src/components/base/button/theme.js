import styled from 'styled-components';
import Text from '../text';
import Box from '../box';

export const FILL_TYPES = {
  FILLED: 'filled',
  GHOST: 'ghost',
  OUTLINED: 'outlined',
};
export const BUTTON_TYPES = {
  SUBMIT: 'submit',
  PRIMARY: 'primary',
  DANGER: 'danger',
};
export const BUTTON_SIZES = {
  SMALL: 'small',
  REGULAR: 'regular',
  LARGE: 'large',
};

const FONT_SIZES = {
  small: '12px',
  regular: '14px',
  large: '18px',
};
const MIN_HEIGHTS = {
  small: '18px',
  regular: '30px',
  large: '40px',
};
const MIN_WIDTHS = {
  small: '42px',
  regular: '120px',
  large: '140px',
};

const BUTTON_THEME = (theme, buttonType) => {
  if (buttonType === BUTTON_TYPES.DANGER) {
    return {
      main: theme.colors.error_500,
      hover: theme.colors.error_700,
    };
  }

  return {
    main: theme.colors.primary_500,
    hover: theme.colors.primary_700,
  };
};

const getColor = ({ theme, fill, buttonType }) => {
  if (fill === FILL_TYPES.OUTLINED || fill === FILL_TYPES.GHOST) {
    return BUTTON_THEME(theme, buttonType).main;
  }
  return theme.colors.white;
};
const getBgColor = ({ theme, fill, buttonType }) => {
  if (fill !== FILL_TYPES.OUTLINED && fill !== FILL_TYPES.GHOST) {
    return BUTTON_THEME(theme, buttonType).main;
  }
  return 'transparent';
};
const getBorderStyle = ({
  theme, fill, buttonType, disabled,
}, isHover) => {
  if (fill === FILL_TYPES.OUTLINED) {
    if (isHover && !disabled) {
      return `1px solid ${BUTTON_THEME(theme, buttonType).hover}`;
    }
    return `1px solid ${BUTTON_THEME(theme, buttonType).main}`;
  }

  return '0';
};

const getHover = ({
  theme, fill, buttonType, disabled,
}, forText = false) => {
  if (disabled) {
    return undefined;
  }
  if ((fill === FILL_TYPES.FILLED && !forText) || (fill !== FILL_TYPES.FILLED && forText)) {
    return BUTTON_THEME(theme, buttonType).hover;
  }
  return undefined;
};

export const Container = styled(Box)`
  display: flex;
  position: relative;
  background: transparent;
`;

export const TextContainer = styled(Text)`
  color: inherit;
  font-size: inherit;
  line-height: 0;
  letter-spacing: 1px;
  font-weight: bold;
  line-height: none;
  margin-top: 1px;
`;

export const ChildrenContainer = styled(Box)`
  opacity: ${p => (p.isLoading ? 0 : 1)};
  cursor: ${p => (p.isLoading ? 'none' : 'inherit')};
  padding: ${({ fill, circular }) => (fill === FILL_TYPES.GHOST || circular ? '0' : '0 20px')};
`;

export const BaseButton = styled.button.attrs({})`
  color: ${props => getColor(props)};
  margin: 0;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: ${({ size, fill }) => (fill === FILL_TYPES.GHOST ? undefined : MIN_HEIGHTS[size])};
  width: ${({ size, circular }) => (circular ? MIN_HEIGHTS[size] : undefined)};
  min-width: ${({ size, fill, circular }) => (circular ? undefined : (fill === FILL_TYPES.GHOST ? undefined : MIN_WIDTHS[size]))};
  background-color: ${props => getBgColor(props)};
  border: ${props => getBorderStyle(props, false)};
  border-radius: 30px;
  cursor: ${props => (props.disabled ? 'none' : 'pointer')};
  font-size: ${({ size }) => FONT_SIZES[size]};
  padding: ${({ circular }) => (circular ? '0' : undefined)};
  &:focus {
    color: ${props => getHover(props, true)};
    background-color: ${props => getHover(props, false)};
    border: ${props => getBorderStyle(props, true)};
    outline: 0;
  }
  &:hover {
    color: ${props => getHover(props, true)};
    background-color: ${props => getHover(props, false)};
    border: ${props => getBorderStyle(props, true)};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  }
  &:disabled {
    opacity: 0.25;
  }
`;
