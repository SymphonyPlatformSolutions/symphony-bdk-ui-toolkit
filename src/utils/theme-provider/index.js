import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { THEMES } from '../../styles/colors';
import Logger from '../logger';


const ThemeToggleContext = React.createContext({
  setTheme: () => {},
  theme: {},
});

export const useTheme = () => React.useContext(ThemeToggleContext);

const MSThemeProvider = ({ children, themeMap = null }) => {
  const hasCustomTheme = themeMap && themeMap.length;

  const [themeState, setThemeState] = React.useState(
    Object.assign({}, hasCustomTheme ? themeMap[0] : THEMES[0]),
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
      value={{ theme: themeState.theme, setTheme }}
    >
      <ThemeProvider
        theme={themeState.theme}
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
