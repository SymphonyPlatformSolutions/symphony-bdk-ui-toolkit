import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { ThemeProvider } from 'styled-components';
import {THEMES} from "../src/styles/colors";
import {Logger} from "../src/utils";
import withTextSizer from './text-sizer';
import './config.css';
import { SizeContext } from './text-sizer/text-size-provider';

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
  name: theme.mode,
}, theme));

const sizes = ['small', 'normal']

const CustomThemeProvider = ({ theme, children }) => {

  return (
    <SizeContext.Consumer>
      {(value) => {
        return (
        <ThemeProvider theme={{...theme, size: value}}>
          {children}
        </ThemeProvider>);
      }}
    </SizeContext.Consumer>
  )
}

addDecorator(withThemesProvider(decoratedThemes, CustomThemeProvider));
addDecorator(withTextSizer(sizes));

configure(loadStories, module);
