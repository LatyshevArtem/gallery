import { getUserColorScheme } from '../utils/get-user-color-scheme';
import { useState } from 'react';
import { DARK_COLOR_SCHEME, LIGHT_COLOR_SHEME } from '../consts';
import { saveUserColorScheme } from '../utils/save-user-color-scheme';
import ThemeContex from '../contexts/ThemeContext';

const userColorScheme = getUserColorScheme();
const initialIsDarkTheme = userColorScheme === DARK_COLOR_SCHEME;

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(initialIsDarkTheme);

  saveUserColorScheme(isDarkTheme ? DARK_COLOR_SCHEME : LIGHT_COLOR_SHEME);

  const toggleTheme = () => setIsDarkTheme((prevTheme) => !prevTheme);

  return (
    <ThemeContex.Provider value={{ isDarkTheme, toggleTheme }}>{children}</ThemeContex.Provider>
  );
};

export default ThemeProvider;
