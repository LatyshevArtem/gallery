import { COLOR_SCHEME_KEY } from './consts';

const saveColorScheme = (scheme) => {
  localStorage.setItem(COLOR_SCHEME_KEY, scheme);
};

export { saveColorScheme };
