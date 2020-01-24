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
import theme from './theme';

Logger.setEnv({
  appTitle: 'MS Storybook',
  environment: 'DEV',
  apiUrl: null,
  debugLevel: 1,
});

const decoratedThemes = THEMES.map(theme => Object.assign({
  name: theme.mode,
}, theme)).reverse();

const sizes = ['small', 'normal'];

const CustomThemeProvider = ({ theme, children, args }) => (
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

const DocsPageWrapper = (args) =>  (
  <ThemeProvider theme={THEMES[0]}>
      <DocsContainer {...args}/>
  </ThemeProvider>
);

const getOrder = (entry) => {
  return entry[1].parameters.order ? entry[1].parameters.order : 100000;
};

addParameters({
  options: {
	  theme: theme,
    showPanel: false,
    storySort: (a, b) => {
	    // makes sure Welcome page is loaded first
	    if (a[0].includes('developer-framework-getting-started--page')) {
	      return -1;
      } else if (b[0].includes('developer-framework-getting-started--page')) {
	      return 1;
      } else {
	      // if its from developer-framework still
	      if (a[0].includes('developer-framework-') && b[0].includes('docs-')) {
	        // if there's an order set, use it
	        if (getOrder(a) < getOrder(b)) {
	          return -1;
          // if there's an order set, use it
	        } else if (getOrder(a) > getOrder(b)) {
	          return 1;
          // otherwise lets use ascending order
          } else {
	          return a[1].id.localeCompare(b[1].id, { numeric: true });
          }
        } else {
           if (getOrder(a) < getOrder(b)) {
	          return -1;
          // if there's an order set, use it
	        } else if (getOrder(a) > getOrder(b)) {
	          return 1;
          // otherwise lets use ascending order
          } else {
	          return a[1].id.localeCompare(b[1].id, { numeric: true });
          }
        }
      }
    },
    showRoots: true,
	},
  docs: {
    container: DocsPageWrapper,
    page: DocsPage,
  },
});

addDecorator(withThemesProvider(decoratedThemes, CustomThemeProvider));
addDecorator(withTextSizer(sizes));
