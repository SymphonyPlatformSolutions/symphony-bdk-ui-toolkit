module.exports = {
  stories: ['../src/components/layout/box/stories.js'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-notes',
    'storybook-addon-styled-component-theme/dist/src/register.js',
    './.storybook/custom-addons/text-sizer/register.js',
  ],
};
