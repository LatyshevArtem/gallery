const checkIsUserPrefersDarkColorScheme = () => {
  const mediaQueryList = matchMedia('(prefers-color-scheme)');
  const isUserPrefersDarkColorScheme = mediaQueryList.matches;
  return isUserPrefersDarkColorScheme;
};

export { checkIsUserPrefersDarkColorScheme };
