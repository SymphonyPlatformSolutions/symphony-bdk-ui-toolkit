import { darken } from 'polished';
import styled from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';
import Box from '../box';

export const FILL_TYPES = {
  FILLED: 'filled',
  GHOST: 'ghost',
  OUTLINED: 'outlined',
};

const PADDING = {
  tiny: '.09rem .625rem',
  small: '.3rem .9375rem',
  large: '.3rem 1.25rem',
};
const FONTSIZE = {
  tiny: '.625rem',
  small: '.75rem',
  large: '1rem',
};

const BUTTON_MIN_HEIGHT = {
  tiny: '1rem',
  small: '1.666rem',
  large: '2rem',
};

const BUTTON_MIN_WIDTH = {
  tiny: '2.625rem',
  small: '6.625rem',
  large: '6.625rem',
};

export const SPINNER_SIZE = {
  tiny: 8,
  small: 10,
  large: 15,
};

/**
 * Theme Definition
 */
const BUTTON_THEME = (theme, type, fill) => {
  const isFilled = fill === FILL_TYPES.FILLED;
  if (!theme) {
    return {};
  }
  const selectedTheme = {
    [THEME_TYPES.LIGHT]: {
      TEXT_COLOR: isFilled ? theme.theme.white : theme.theme[type],
      BG_COLOR: isFilled ? theme.theme[type] : 'inherit',
    },
    [THEME_TYPES.DARK]: {
      TEXT_COLOR: isFilled ? theme.theme.white : theme.theme[type],
      BG_COLOR: isFilled ? theme.theme[type] : 'transparent',
    },
  };

  if (!theme || !theme.mode) {
    return {
      TEXT_COLOR: '#fff',
      BG_COLOR: '#fff',
    };
  }

  return selectedTheme[theme.mode];
};

/**
 * Helper Functions
 */

const getColor = ({
  theme, type, fill, disabled,
}) => {
  const selectedTheme = BUTTON_THEME(theme, type, fill);
  return disabled ? theme.theme.grey : selectedTheme.TEXT_COLOR;
};

const getHoverActiveColor = ({
  theme, fill, disabled, type,
}) => {
  const isOutlined = fill === FILL_TYPES.OUTLINED;
  const selectedTheme = BUTTON_THEME(theme, type, fill);
  return disabled ? theme.theme.grey : isOutlined ? theme.theme.white : selectedTheme.TEXT_COLOR;
};

const getHoverBgColor = ({
  theme, type, fill, disabled,
}) => {
  const isFilled = fill === FILL_TYPES.FILLED;
  const isGhost = fill === FILL_TYPES.GHOST;
  const buttonBg = theme.theme[type];
  const selectedTheme = BUTTON_THEME(theme, type, fill);
  return disabled || isGhost ? null : isFilled ? darken(0.1, buttonBg) : selectedTheme.TEXT_COLOR;
};

const getBgColor = ({
  theme, type, fill, disabled,
}) => {
  const selectedTheme = BUTTON_THEME(theme, type, fill);
  const disabledBg = fill === FILL_TYPES.FILLED ? theme.theme.darkgrey : 'transparent';
  return disabled ? disabledBg : selectedTheme.BG_COLOR;
};

const getBorderStyle = (props) => {
  const isOutlined = props.fill === FILL_TYPES.OUTLINED;
  return isOutlined ? `2px solid ${getColor(props)}` : 'inherit';
};


const getPadding = props => PADDING[props.size];
const getFontSize = props => FONTSIZE[props.size];
const getButtonMinHeight = props => BUTTON_MIN_HEIGHT[props.size];
const getButtonMinWidth = props => BUTTON_MIN_WIDTH[props.size];

export const getSpinnerColor = ({
  theme, type, fill, isMouseOver,
}) => {
  const isOutlined = fill === FILL_TYPES.OUTLINED;
  return isOutlined && !isMouseOver ? getColor({ theme, type, fill }) : theme.theme.white;
};

export const Container = styled(Box)`
  display: flex;
  position: relative;
  background: transparent;
`;

export const ChildrenContainer = styled(Box)`
  opacity: ${p => (p.isLoading ? 0.3 : 1)};
  cursor: ${p => (p.isLoading ? 'none' : 'inherit')};`;


export const BaseButton = styled.button.attrs({
  fontFamily: 'Lato, sans-serif',
})`
  color: ${props => getColor(props)};
  font-size: ${props => getFontSize(props)};
  margin: 0;
  transition: all .3s cubic-bezier(.25,.8,.25,1);
  height: ${props => getButtonMinHeight(props)};
  min-width: ${props => getButtonMinWidth(props)};
  padding: ${props => getPadding(props)};
  background-color: ${props => getBgColor(props)};
  border: ${props => getBorderStyle(props)};
  border-radius: 22px;
  cursor: ${props => (props.disabled ? 'none' : 'pointer')};
  &:focus {
    outline: 0
  }
  &:hover {
    background: ${props => getHoverBgColor(props)};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    color: ${props => getHoverActiveColor(props)}
  }
`;
