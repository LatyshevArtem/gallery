import { COLOR_SCHEME_KEY, DARK_COLOR_SCHEME, LIGHT_COLOR_SHEME } from './consts';
import { checkIsUserPrefersDarkColorScheme } from './check-is-user-prefers-dark-color-scheme';

const getUserColorScheme = () => {
  let userColorScheme = localStorage.getItem(COLOR_SCHEME_KEY);
  if (!userColorScheme) {
    const isUserPrefersDarkColorScheme = checkIsUserPrefersDarkColorScheme();
    userColorScheme = isUserPrefersDarkColorScheme ? DARK_COLOR_SCHEME : LIGHT_COLOR_SHEME;
  }

  return userColorScheme;
};

export { getUserColorScheme };
