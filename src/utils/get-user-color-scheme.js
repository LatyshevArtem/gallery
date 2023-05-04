import { COLOR_SCHEME_KEY, DARK_COLOR_SCHEME, LIGHT_COLOR_SHEME } from '../consts';
import { saveUserColorScheme } from './save-user-color-scheme';

const checkIsDarkColorScheme = () => {
  const mediaQueryList = matchMedia('(prefers-color-scheme)');
  const isDarkColorScheme = mediaQueryList.matches;
  return isDarkColorScheme;
};

const getUserColorScheme = () => {
  let userColorScheme = localStorage.getItem(COLOR_SCHEME_KEY);
  if (!userColorScheme) {
    const isDarkColorScheme = checkIsDarkColorScheme();
    userColorScheme = isDarkColorScheme ? DARK_COLOR_SCHEME : LIGHT_COLOR_SHEME;
    saveUserColorScheme(userColorScheme);
  }

  return userColorScheme;
};

export { getUserColorScheme };
