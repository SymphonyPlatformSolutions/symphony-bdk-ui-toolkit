import { THEME_TYPES, colors } from '../../../styles/colors';

export const BUTTON_THEME = {
  [THEME_TYPES.LIGHT]: {
    TEXT_COLOR: colors.white,
    BG_COLOR: colors.white,
  },
  [THEME_TYPES.DARK]: {
    TEXT_COLOR: colors.white,
    BG_COLOR: colors.lightgrey,
  },
};

const FILL_TYPES = {
  FILLED: 'filled',
  GHOST: 'ghost',
  NONE: 'none',
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

export const getColor = ({
  theme, type, fill,
}) => {
  const isFilled = fill === FILL_TYPES.FILLED;
  return isFilled ? BUTTON_THEME[theme.mode].TEXT_COLOR : theme.theme[type];
};

export const getBgColor = (props) => {
  const isFilled = props.fill === FILL_TYPES.FILLED;
  return isFilled ? props.theme.theme[props.type] : BUTTON_THEME[props.theme.mode].BG_COLOR;
};

export const getPadding = props => PADDING[props.size];
export const getFontSize = props => FONTSIZE[props.size];
export const getBorderStyle = props => (props.fill === FILL_TYPES.FILLED || props.fill === FILL_TYPES.GHOST ? FILL_TYPES.NONE : `2px solid ${getColor(props)}`);

export const getHoverBackground = (props) => {
  return props.fill === FILL_TYPES.FILLED
}
