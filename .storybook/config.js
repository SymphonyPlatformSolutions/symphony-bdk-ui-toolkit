import { addParameters, configure, addDecorator } from '@storybook/react';
import {withThemesProvider} from 'storybook-addon-styled-component-theme';
import {THEMES} from "../src/styles/colors";

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("../src/components", true, /stories\.js?$/));
}

const decoratedThemes = THEMES.map(theme => Object.assign({
  name: theme.mode
}, theme));

addDecorator(withThemesProvider(decoratedThemes));

addParameters({ viewport: { defaultViewport: 'responsive' } });

configure(loadStories, module);

window.appConfig = {
  appTitle: 'MS Storybook',
  env: 'DEV',
  apiUrl: null,
  debugLevel: 1,
};
