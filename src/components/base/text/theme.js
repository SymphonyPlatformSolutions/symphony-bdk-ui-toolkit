import styled from 'styled-components';

const FONTSIZE = {
  tiny: '10px',
  small: '12px',
  regular: '14px',
  large: '18px',
};
const FONTSIZETITLE = {
  tiny: '14px',
  small: '18px',
  regular: '24px',
  large: '40px',
};
const LINEHEIGHT = {
  tiny: '16px',
  small: '14px',
  regular: '20px',
  large: '24px',
};
const LINEHEIGHTTITLE = {
  tiny: '20px',
  small: '24px',
  regular: '24px',
  large: '28px',
};

const getTextColor = ({ type, theme, isTitle }) => {
  const colorMap = {
    primary: theme.colors.grey_900,
    secondary: theme.colors.grey_700,
    danger: theme.colors.error_700,
    info: theme.colors.warning_700,
  };

  return isTitle
    ? colorMap.primary : (colorMap[type] ? colorMap[type] : theme.colors.grey_700);
};

const getPadding = ({ px, py }) => {
  let defaultPadding = '0 0';
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
  const providedMx = mx || '0';
  const providedMy = my || '0';
  return `${providedMy} ${providedMx}`;
};
const getFontStyle = ({ isTitle, size }) => (isTitle || size !== 'tiny' ? 'normal' : 'italic');
const getFontSize = ({ isTitle, size }) => (isTitle ? FONTSIZETITLE[size] : FONTSIZE[size]);
const getLineHeight = ({ isTitle, size }) => (isTitle ? LINEHEIGHTTITLE[size] : LINEHEIGHT[size]);
const getFontWeight = ({ isTitle }) => (isTitle ? '900' : '400');
const getBorderBottom = ({ underline, theme }) => (underline ? `1px ${theme.colors.grey_700} solid` : '0px');

export const BaseText = styled.div`
  color: ${props => getTextColor(props)};
  font-style: ${props => getFontStyle(props)};
  font-size: ${props => getFontSize(props)};
  font-weight: ${props => getFontWeight(props)};
  line-height: ${props => getLineHeight(props)};
  padding: ${props => getPadding(props)};
  border-bottom: ${props => getBorderBottom(props)};
  margin: ${props => getMargin(props)};;
`;
