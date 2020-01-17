import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { ThemeProvider } from 'styled-components';
import {THEMES} from "../src/styles/colors";
import {Logger} from "../src/utils";
import withTextSizer from './custom-addons/text-sizer';
import './config.css';
import { SizeContext } from './custom-addons/text-sizer/text-size-provider';
import { StoryWrapper } from '../src/components/misc/wrappers';
import { themes } from '@storybook/theming'
import theme from './theme';

Logger.setEnv({
  appTitle: 'MS Storybook',
  environment: 'DEV',
  apiUrl: null,
  debugLevel: 1,
});

const decoratedThemes = THEMES.map(theme => Object.assign({
  name: theme.mode,
}, theme));

const sizes = ['small', 'normal'];

const CustomThemeProvider = ({ theme, children }) => (
  <SizeContext.Consumer>
    {(value) => {
      return (
      <ThemeProvider theme={{...theme, size: value}}>
         <StoryWrapper p={15}>
          {children}
         </StoryWrapper>
      </ThemeProvider>);
    }}
  </SizeContext.Consumer>
);

const Test = (args) =>  {
  const themes = withThemesProvider(decoratedThemes);
  console.log(args)
    console.log(themes);
  return DocsContainer;
}

addParameters({
  docs: {
    container: Test,
    page: DocsPage,
  },
});

addParameters({
  options: {
	  theme: theme,
	}
});

addDecorator(withThemesProvider(decoratedThemes, CustomThemeProvider));
addDecorator(withTextSizer(sizes));
