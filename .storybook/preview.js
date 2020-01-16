import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { ThemeProvider } from 'styled-components';
import {THEMES} from "../src/styles/colors";
import {Logger} from "../src/utils";
import withTextSizer from './custom-addons/text-sizer';
import './config.css';
import { SizeContext } from './custom-addons/text-sizer/text-size-provider';
import { StoryWrapper } from '../src/components/misc/wrappers';
import { themes } from '@storybook/theming'

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

const CustomThemeProvider = ({ theme, children }) => {
  return (
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
  )
};


addParameters({
options: {
	theme: themes.dark,
	}
})


addDecorator(withThemesProvider(decoratedThemes, CustomThemeProvider));
addDecorator(withTextSizer(sizes));
