import { useState } from 'react';
import { getInitialIsDarkTheme } from './utils/get-initial-is-dark-theme';
import { DARK_COLOR_SCHEME, LIGHT_COLOR_SHEME } from './utils/consts';
import { saveColorScheme } from './utils/save-color-scheme';
import ThemeContex from '../../contexts/ThemeContext';

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialIsDarkTheme);

  const colorScheme = isDarkTheme ? DARK_COLOR_SCHEME : LIGHT_COLOR_SHEME;
  saveColorScheme(colorScheme);

  const toggleTheme = () => setIsDarkTheme((prevTheme) => !prevTheme);

  return (
    <ThemeContex.Provider value={{ isDarkTheme, toggleTheme }}>{children}</ThemeContex.Provider>
  );
};

export default ThemeProvider;
