import styled from 'styled-components';

const FONTSIZE = {
  tiny: '0.8rem',
  small: '0.9rem',
  regular: '1rem',
  large: '1.4rem',
};
const FONTSIZETITLE = {
  tiny: '1rem',
  small: '1.3rem',
  regular: '1.7rem',
  large: '2.8rem',
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
const getFontWeight = ({ isTitle }) => (isTitle ? '900' : '400');
const getBorderBottom = ({ underline, theme }) => (underline ? `1px ${theme.colors.grey_700} solid` : '0px');

export const BaseText = styled.div`
  color: ${props => getTextColor(props)};
  font-style: ${props => getFontStyle(props)};
  font-size: ${props => getFontSize(props)};
  font-weight: ${props => getFontWeight(props)};
  padding: ${props => getPadding(props)};
  border-bottom: ${props => getBorderBottom(props)};
  margin: ${props => getMargin(props)};;
`;
