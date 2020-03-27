import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',

  colorPrimary: '#007ecc',
  colorSecondary: 'deepskyblue',

  // UI
  appBg: '#17191c',
  appContentBg: '#232529',
  appBorderColor: 'transparent',
  appBorderRadius: 5,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#f1f2f3',
  textInverseColor: '#0E0D0C',

  // Toolbar default and active colors
  barTextColor: '#f1f2f3',
  barSelectedColor: '#007ecc',
  barBg: '#232529',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: '#f1f2f3',
  inputBorderRadius: 4,

  brandTitle: 'Symphony',
  brandUrl: '/',
  brandImage: '/logo-symphony.svg',
});
