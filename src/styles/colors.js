export const THEME_TYPES = {
  LIGHT: 'light',
  DARK: 'dark',
};

const THEMES = [
  {
    mode: THEME_TYPES.LIGHT,
    theme: {
      caution: '#CD4747',
      cta: '#57B68B',
      system: '#006CAF',
      darkgrey: '#4A4A4A',
    },
  },
  {
    mode: THEME_TYPES.DARK,
    theme: {
      caution: '#cd33c9',
      cta: '#3e37b6',
      system: '#af000f',
      darkgrey: '#4A4A4A',
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
