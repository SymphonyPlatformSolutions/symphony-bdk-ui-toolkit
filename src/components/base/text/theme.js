import { THEME_TYPES } from '../../../styles/colors';

const PADDING = {
  tiny: '3px 10px',
  small: '5px 10px',
  large: '8px 10px',
};
const FONTSIZE = {
  tiny: '12px',
  small: '14px',
  large: '16px',
};
const FONTSIZETITLE = {
  tiny: '12px',
  small: '18px',
  large: '24px',
};
const LINEHEIGHT = {
  tiny: '16px',
  small: '16px',
  large: '20px',
};
const LINEHEIGHTTITLE = {
  tiny: '14px',
  small: '20px',
  large: '29px',
};

const TEXT_THEME = (theme) => {
  const selectedTheme = {
    [THEME_TYPES.LIGHT]: {
      TEXT_COLOR: '#000000',
    },
    [THEME_TYPES.DARK]: {
      TEXT_COLOR: '#ffffff',
    },
  };

  return selectedTheme[theme.mode];
};

export const getTextColor = ({ title, size, theme }) => (title || size !== 'tiny' ? TEXT_THEME(theme).TEXT_COLOR : TEXT_THEME(theme).TEXT_COLOR);
export const getPadding = ({ size }) => PADDING[size];
export const getFontStyle = ({ title, size }) => (title || size !== 'tiny' ? 'normal' : 'italic');
export const getFontSize = ({ title, size }) => (title ? FONTSIZETITLE[size] : FONTSIZE[size]);
export const getLineHeight = ({ title, size }) => (title ? LINEHEIGHTTITLE[size] : LINEHEIGHT[size]);
export const getFontWeight = ({ title }) => (title ? '900' : '400');
export const getBorderBottom = ({ underline, theme }) => (underline ? `1px ${theme.theme.grey} solid` : '0px');
