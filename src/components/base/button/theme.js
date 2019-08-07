import { darken } from 'polished';
import { THEME_TYPES } from '../../../styles/colors';

export const FILL_TYPES = {
  FILLED: 'filled',
  GHOST: 'ghost',
  OUTLINED: 'outlined',
};

const PADDING = {
  tiny: '3px 10px',
  small: '5px 15px',
  large: '5px 20px',
};
const FONTSIZE = {
  tiny: '0.5em',
  small: '0.7em',
  large: '1em',
};

export const SPINNER_SIZE = {
  tiny: 8,
  small: 10,
  large: 15,
};

/**
 * Theme Definition
 */
export const BUTTON_THEME = (theme, type, fill) => {
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

  return selectedTheme[theme.mode];
};

/**
 * Helper Functions
 */

export const getColor = ({
  theme, type, fill, disabled,
}) => {
  const selectedTheme = BUTTON_THEME(theme, type, fill);
  return disabled ? theme.theme.grey : selectedTheme.TEXT_COLOR;
};

export const getHoverActiveColor = ({
  theme, fill, disabled, type,
}) => {
  const isOutlined = fill === FILL_TYPES.OUTLINED;
  const selectedTheme = BUTTON_THEME(theme, type, fill);
  return disabled ? theme.theme.grey : isOutlined ? theme.theme.white : selectedTheme.TEXT_COLOR;
};

export const getHoverBgColor = ({
  theme, type, fill, disabled,
}) => {
  const isFilled = fill === FILL_TYPES.FILLED;
  const isGhost = fill === FILL_TYPES.GHOST;
  const buttonBg = theme.theme[type];
  const selectedTheme = BUTTON_THEME(theme, type, fill);
  return disabled || isGhost ? null : isFilled ? darken(0.1, buttonBg) : selectedTheme.TEXT_COLOR;
};

export const getBgColor = ({
  theme, type, fill, disabled,
}) => {
  const selectedTheme = BUTTON_THEME(theme, type, fill);
  const disabledBg = fill === FILL_TYPES.FILLED ? theme.theme.darkgrey : 'transparent';
  return disabled ? disabledBg : selectedTheme.BG_COLOR;
};

export const getSpinnerColor = ({
  theme, type, fill, isMouseOver
}) => {
  const isOutlined = fill === FILL_TYPES.OUTLINED;
  return isOutlined && !isMouseOver ? getColor({ theme, type, fill }) : theme.theme.white;
};
export const getBorderStyle = (props) => {
  const isOutlined = props.fill === FILL_TYPES.OUTLINED;
  return isOutlined ? `2px solid ${getColor(props)}` : 'inherit';
};


export const getPadding = props => {
  return PADDING[props.size];
}
export const getFontSize = props => FONTSIZE[props.size];
