import styled from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';

const PADDING = {
  tiny: '3px 10px',
  small: '5px 10px',
  large: '8px 10px',
};

const FONTSIZE = {
  tiny: '.75rem',
  small: '.87rem',
  large: '1rem',
};
const FONTSIZETITLE = {
  tiny: '.75rem',
  small: '1rem',
  large: '2rem',
};
const LINEHEIGHT = {
  tiny: '1rem',
  small: '1rem',
  large: '1.25rem',
};
const LINEHEIGHTTITLE = {
  tiny: '14px',
  small: '20px',
  large: '29px',
};

const getTextColor = ({ type, theme }) => {
  const colorMap = {
    primary: theme.mode === THEME_TYPES.DARK ? theme.theme.white : '#4d4d4d',
    secondary: theme.mode === THEME_TYPES.DARK ? theme.theme.white : '#000000',
    danger: theme.theme.danger,
    info: theme.theme.darkgrey,
  };

  return colorMap[type] ? colorMap[type] : '#000000';
};

const getPadding = ({ size, px, py }) => {
  let defaultPadding = PADDING[size];
  if (px) {
    const split = defaultPadding.split(' ');
    split[1] = px;
    defaultPadding = split.join(' ');
  }
  if (py) {
    const split = defaultPadding.split(' ');
    split[0] = py;
    defaultPadding = split.join(' ');
  }
  return defaultPadding;
};
const getMargin = ({ mx, my }) => {
  const providedMx = mx || '0px';
  const providedMy = my || '10px';
  return `${providedMy} ${providedMx}`;
};
const getFontStyle = ({ title, size }) => (title || size !== 'tiny' ? 'normal' : 'italic');
const getFontSize = ({ title, size }) => (title ? FONTSIZETITLE[size] : FONTSIZE[size]);
const getLineHeight = ({ title, size }) => (title ? LINEHEIGHTTITLE[size] : LINEHEIGHT[size]);
const getFontWeight = ({ title }) => (title ? '900' : '400');
const getBorderBottom = ({ underline, theme }) => (underline ? `1px ${theme.theme.grey} solid` : '0px');

export const BaseText = styled.div`
  color: ${props => getTextColor(props)};
  font-family: 'Lato', sans-serif;
  font-style: ${props => getFontStyle(props)};
  font-size: ${props => getFontSize(props)};
  font-weight: ${props => getFontWeight(props)};
  line-height: ${props => getLineHeight(props)};
  padding: ${props => getPadding(props)};
  border-bottom: ${props => getBorderBottom(props)};
  margin: ${props => getMargin(props)};;
`;
