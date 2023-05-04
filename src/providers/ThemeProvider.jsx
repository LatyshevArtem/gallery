import { getUserColorScheme } from '../utils/get-user-color-scheme';
import { useState } from 'react';
import { DARK_COLOR_SCHEME, LIGHT_COLOR_SHEME } from '../consts';
import { saveUserColorScheme } from '../utils/save-user-color-scheme';
import ThemeContex from '../contexts/ThemeContext';

const ThemeProvider = ({ children }) => {
  const userColorScheme = getUserColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState(userColorScheme === DARK_COLOR_SCHEME);

  const toggleTheme = () => {
    saveUserColorScheme(!isDarkTheme ? DARK_COLOR_SCHEME : LIGHT_COLOR_SHEME);
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContex.Provider value={{ isDarkTheme, toggleTheme }}>{children}</ThemeContex.Provider>
  );
};

export default ThemeProvider;
