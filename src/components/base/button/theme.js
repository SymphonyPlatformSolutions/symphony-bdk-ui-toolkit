import { darken } from 'polished';
import styled from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';
import Box from '../box';

export const FILL_TYPES = {
  FILLED: 'filled',
  GHOST: 'ghost',
  OUTLINED: 'outlined',
};


const FONTSIZE = {
  tiny: 'x-small',
  small: 'small',
  large: '1rem',
};

const FONTSIZE_CIRCULAR = {
  tiny: '1',
  small: '1.2',
  large: '1.4rem',
};

const BUTTON_MIN_HEIGHT = {
  tiny: '1rem',
  small: '1.5rem',
  large: '2rem',
};

const BUTTON_MIN_WIDTH = {
  tiny: '2.625rem',
  small: '6.625rem',
  large: '6.625rem',
};

const BUTTON_MIN_WIDTH_CIRCULAR = {
  tiny: '1rem',
  small: '2rem',
  large: '3rem',
};

const BUTTON_MIN_HEIGHT_CIRCULAR = {
  tiny: '1rem',
  small: '2rem',
  large: '3rem',
};

export const SPINNER_SIZE = {
  tiny: 8,
  small: 10,
  large: 15,
};

/**
 * Theme Definition
 */
const BUTTON_THEME = (theme, buttonType, fill) => {
  const isFilled = fill === FILL_TYPES.FILLED;
  if (!theme) {
    return {};
  }
  const selectedTheme = {
    [THEME_TYPES.LIGHT]: {
      TEXT_COLOR: isFilled ? (buttonType === 'primary' || buttonType === 'danger' || buttonType === 'submit' ? theme.colors.white : theme.colors.black) : theme.colors[buttonType],
      BG_COLOR: isFilled ? theme.colors[buttonType] : 'inherit',
    },
    [THEME_TYPES.DARK]: {
      TEXT_COLOR: isFilled ? theme.colors.black : theme.colors[buttonType],
      BG_COLOR: isFilled ? theme.colors[buttonType] : 'transparent',
    },
  };

  if (!theme || !theme.mode) {
    return {
      TEXT_COLOR: theme.colors.white,
      BG_COLOR: theme.colors.white,
    };
  }

  return selectedTheme[theme.mode];
};

/**
 * Helper Functions
 */

const getColor = ({
  theme, buttonType, fill, disabled,
}) => {
  const selectedTheme = BUTTON_THEME(theme, buttonType, fill);
  return disabled
    ? fill === FILL_TYPES.FILLED
      ? theme.colors.grey
      : theme.colors.darkgrey
    : selectedTheme.TEXT_COLOR;
};

const getHoverActiveColor = ({
  theme, fill, disabled, buttonType,
}) => {
  const isOutlined = fill === FILL_TYPES.OUTLINED;
  const selectedTheme = BUTTON_THEME(theme, buttonType, fill);
  return disabled
    ? getColor({
      theme, fill, disabled, buttonType,
    })
    : isOutlined
      ? theme.colors.white
      : selectedTheme.TEXT_COLOR;
};

const getHoverBgColor = ({
  theme, buttonType, fill, disabled,
}) => {
  const isFilled = fill === FILL_TYPES.FILLED;
  const isGhost = fill === FILL_TYPES.GHOST;
  const buttonBg = theme.colors[buttonType];
  const selectedTheme = BUTTON_THEME(theme, buttonType, fill);
  return disabled || isGhost
    ? null
    : isFilled
      ? darken(0.1, buttonBg)
      : selectedTheme.TEXT_COLOR;
};

const getBgColor = ({
  theme, buttonType, fill, disabled,
}) => {
  const selectedTheme = BUTTON_THEME(theme, buttonType, fill);
  const disabledBg = fill === FILL_TYPES.FILLED ? theme.colors.darkgrey : 'transparent';
  return disabled ? disabledBg : selectedTheme.BG_COLOR;
};

const getBorderStyle = (props) => {
  const isOutlined = props.fill === FILL_TYPES.OUTLINED;
  return isOutlined ? `2px solid ${getColor(props)}` : 'inherit';
};

const getBorderRadius = props => (props.circular ? '72px' : '0px');

const getFontSize = props => (props.circular ? FONTSIZE_CIRCULAR[props.size] : FONTSIZE[props.size]);

const getButtonMinHeight = props => (props.circular ? BUTTON_MIN_HEIGHT_CIRCULAR[props.size] : BUTTON_MIN_HEIGHT[props.size]);

const getButtonMinWidth = props => (props.circular ? BUTTON_MIN_WIDTH_CIRCULAR[props.size] : BUTTON_MIN_WIDTH[props.size]);

export const getSpinnerColor = ({
  theme, fill,
}) => {
  if (fill === FILL_TYPES.OUTLINED) {
    return {
      tile: theme.colors.white,
      background: theme.colors.darkgrey,
    };
  }
  return {
    tile: theme.colors.darkgrey,
    background: theme.colors.white,
  };
};

const getButtonBoxShadow = (({
  theme, fill, disabled, circular,
}) => {
  const isGhost = fill === FILL_TYPES.GHOST;
  const isDark = theme.mode === THEME_TYPES.DARK;
  return disabled || isGhost ? null : isDark ? circular ? '0px 0px 4px 1px rgba(255,255,255,0.27)' : '0px 2px 4px 0px rgba(255, 255, 255, 0.27)' : '0px 3px 4px 0px rgba(0,0,0,.14)';
});


export const Container = styled(Box)`
  display: flex;
  position: relative;
  background: transparent;
`;

export const ChildrenContainer = styled(Box)`
  opacity: ${p => (p.isLoading ? 0.3 : 1)};
  cursor: ${p => (p.isLoading ? 'none' : 'inherit')};
  padding: 0px 20px;
`;

export const BaseButton = styled.button.attrs({
})`
  color: ${props => getColor(props)};
  font-size: ${props => getFontSize(props)};
  margin: 0;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: ${props => getButtonMinHeight(props)};
  min-width: ${props => getButtonMinWidth(props)};
  width: ${props => (props.circular ? getButtonMinWidth(props) : null)};
  background-color: ${props => getBgColor(props)};
  border: ${props => getBorderStyle(props)};
  border-radius: ${props => getBorderRadius(props)};
  box-shadow: ${getButtonBoxShadow};
  cursor: ${props => (props.disabled ? 'none' : 'pointer')};
  &:focus {
    outline: 0;
  }
  &:hover {
    background: ${props => getHoverBgColor(props)};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    color: ${props => getHoverActiveColor(props)};
  }
`;
