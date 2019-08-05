#Themes

Whenever you want to override your themes on your extension app, make sure to describe them like so:

## Theme Object

```jsx
export const THEME_TYPES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};

const THEMES = [
  {
    mode: THEME_TYPES.LIGHT,
    theme: {
      primary: '#006CAF',
      secondary: '#006CAF',
      danger: '#D50935',
      grey: '#E3E5E8',
      white: '#fff',
      blue: '#1066F2',
      darkgrey: '#9197A1',
      lightgrey: '#E6E6E6',
      basegrey: '#F7F8F8',
      orange: '#f58b3a',
      dark: '#17191C',
      darkaccent: '#25272A',
    },
  },
  {
    mode: THEME_TYPES.DARK,
    theme: {
      primary: '#006CAF',
      secondary: '#33b1ff',
      danger: '#f74a6f',
      grey: '#464B53',
      white: '#fff',
      blue: '#1066F2',
      darkgrey: '#868C97',
      lightgrey: '#E6E6E6',
      basegrey: '#F1F2F3',
      orange: '#f58b3a',
      dark: '#17191C',
      darkaccent: '#25272A',
    },
  },
];
```

#Setting themes
On your project, use `ThemeProvider' from styled components in order to have your components
using the defined themes, like so:

```jsx
import Styled, { ThemeProvider } from 'styled-components';

const currentTheme = Themes[0];

<ContainerWrapper>
    <ThemeProvider theme={currentTheme}>
      <BrowserRouter>
        <Switch>
         ...
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
</ContainerWrapper>
```
