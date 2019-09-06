export const THEME_TYPES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};

const THEMES = [
  {
    mode: THEME_TYPES.LIGHT,
    colors: {
      primary: '#006CAF',
      secondary: '#006CAF',
      danger: '#D50935',
      submit: '#006CAF',
      grey: '#E3E5E8',
      white: '#fff',
      black: '#000',
      blue: '#1066F2',
      darkgrey: '#9197A1',
      bordergrey: '#9197A1',
      lightgrey: '#E6E6E6',
      basegrey: '#F7F8F8',
      inputgrey: '#fff',
      textcolor: '#4d4d4d',
      orange: '#f58b3a',
      dark: '#17191C',
      darkaccent: '#25272A',
    },
  },
  {
    mode: THEME_TYPES.DARK,
    colors: {
      primary: '#006CAF',
      secondary: '#33b1ff',
      danger: '#f74a6f',
      submit: '#006CAF',
      grey: '#464B53',
      white: '#fff',
      black: '#000',
      blue: '#1066F2',
      darkgrey: '#868C97',
      lightgrey: '#E6E6E6',
      basegrey: '#F1F2F3',
      inputgrey: '#2F3237',
      textcolor: '#fff',
      bordergrey: '#6f747c',
      orange: '#f58b3a',
      dark: '#17191C',
      darkaccent: '#25272A',
    },
  },
];

export { THEMES };
