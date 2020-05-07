module.exports = {
  stories: ['../src/**/*.stories.(js|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-links',
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs',
    'storybook-addon-styled-component-theme/dist/src/register.js',
    './.storybook/custom-addons/text-sizer/register.js',
    './.storybook/custom-addons/skin-selector/register.js',
  ],
};
