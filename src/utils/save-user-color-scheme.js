import { COLOR_SCHEME_KEY } from '../consts';

const saveUserColorScheme = (colorScheme) => {
  localStorage.setItem(COLOR_SCHEME_KEY, colorScheme);
};

export { saveUserColorScheme };
