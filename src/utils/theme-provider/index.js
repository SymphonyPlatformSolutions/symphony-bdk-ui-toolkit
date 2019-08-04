import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Logger from '../logger';

const THEMES = [
  {
    mode: 'LIGHT',
    theme: {
      primary: '#006CAF',
      secondary: '#006CAF',
      danger: '#D50935',
      darkgrey: '#9197A1',
      grey: '#E3E5E8',
    },
  },
  {
    mode: 'DARK',
    theme: {
      primary: '#006CAF',
      secondary: '#33b1ff',
      danger: '#f74a6f',
      darkgrey: '#868C97',
      grey: '#464B53',
    },
  },

];

const ThemeToggleContext = React.createContext({
  setTheme: () => {},
  theme: THEMES[0],
});

export const useTheme = () => React.useContext(ThemeToggleContext);

const MSThemeProvider = ({ children, themeMap = null }) => {
  const hasCustomTheme = themeMap && themeMap.length;

  const [themeState, setThemeState] = React.useState(
    Object.assign({}, hasCustomTheme ? themeMap[0] : {
      mode: 'LIGHT',
      theme: {
        primary: '#006CAF',
        secondary: '#006CAF',
        danger: '#D50935',
        darkgrey: '#9197A1',
        grey: '#E3E5E8',
      },
    }),
  );

  const setTheme = (value) => {
    const theme = hasCustomTheme
      ? themeMap.find(el => el.mode === value)
      : THEMES.find(el => el.mode === value);

    if (!theme) {
      Logger.error(`Selected Theme ${value} doesnt exists`);
      return;
    }

    setThemeState(Object.assign({}, theme));
  };

  return (
    <ThemeToggleContext.Provider
      value={{ theme: themeState, setTheme }}
    >
      <ThemeProvider
        theme={themeState}
      >
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

MSThemeProvider.propTypes = {
  children: PropTypes.any,
  themeMap: PropTypes.array,
};

MSThemeProvider.defaultProps = {
  children: [],
  themeMap: null,
};

export default MSThemeProvider;
