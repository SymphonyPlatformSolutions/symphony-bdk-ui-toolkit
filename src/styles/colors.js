export const THEME_TYPES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};

const THEMES = [
  {
    mode: THEME_TYPES.LIGHT,
    theme: {
      primary: '#006CAF',
      secondary: '#006CAF',
      danger: '#D50935',
      grey: '#9197A1',
      darkgrey: '#E3E5E8',
    },
  },
  {
    mode: THEME_TYPES.DARK,
    theme: {
      primary: '#006CAF',
      secondary: '#33b1ff',
      danger: '#f74a6f',
      grey: '#868C97',
      darkgrey: '#464B53',
    },
  },

];

const colors = {
  white: '#fff',
  blue: '#1066F2',
  darkgrey: '#4A4A4A',
  grey: '#979797',
  lightgrey: '#E6E6E6',
  basegrey: '#F7F8F8',
  orange: '#f58b3a',
  caution: '#CD4747',
  cta: '#57B68B',
  system: '#006CAF',
};

export { THEMES, colors };
