import { useState } from 'react';
import { getInitialIsDarkTheme } from './utils/get-initial-is-dark-theme';
import { DARK_COLOR_SCHEME, LIGHT_COLOR_SHEME } from './utils/consts';
import { saveColorScheme } from './utils/save-color-scheme';
import ThemeContex from '../../contexts/ThemeContext';

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialIsDarkTheme);

  saveColorScheme(isDarkTheme ? DARK_COLOR_SCHEME : LIGHT_COLOR_SHEME);

  const toggleTheme = () => setIsDarkTheme((prevTheme) => !prevTheme);

  return (
    <ThemeContex.Provider value={{ isDarkTheme, toggleTheme }}>{children}</ThemeContex.Provider>
  );
};

export default ThemeProvider;
