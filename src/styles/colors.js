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
      grey: '#E3E5E8',
      white: '#fff',
      blue: '#1066F2',
      darkgrey: '#9197A1',
      lightgrey: '#E6E6E6',
      basegrey: '#F7F8F8',
      orange: '#f58b3a',
      dark: '#17191C',
      darkaccent: '#25272A',
    },
  },
  {
    mode: THEME_TYPES.DARK,
    theme: {
      primary: '#006CAF',
      secondary: '#33b1ff',
      danger: '#f74a6f',
      grey: '#464B53',
      white: '#fff',
      blue: '#1066F2',
      darkgrey: '#868C97',
      lightgrey: '#E6E6E6',
      basegrey: '#F1F2F3',
      orange: '#f58b3a',
      dark: '#17191C',
      darkaccent: '#25272A',
    },
  },

];

export { THEMES };
