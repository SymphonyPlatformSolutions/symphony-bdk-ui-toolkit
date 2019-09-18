import { addParameters, configure, addDecorator } from '@storybook/react';
import {withThemesProvider} from 'storybook-addon-styled-component-theme';
import {THEMES} from "../src/styles/colors";
import {Logger} from "../src/utils";
import './config.css';

Logger.setEnv({
  appTitle: 'MS Storybook',
  environment: 'DEV',
  apiUrl: null,
  debugLevel: 1,
});

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
