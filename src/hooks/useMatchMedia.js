import { useState, useLayoutEffect } from 'react';

const QUERIES = [
  '(max-width: 767px)',
  '(min-width: 768px) and (max-width: 1023px)',
  '(min-width: 1024px) and (max-width: 1365px)',
  '(min-width: 1366px)',
];

const useMatchMedia = () => {
  const mediaQueryLists = QUERIES.map((query) => matchMedia(query));

  const getValues = () => mediaQueryLists.map((mdl) => mdl.matches);

  const [values, setValues] = useState(getValues);

  useLayoutEffect(() => {
    const handler = () => setValues(getValues);
    mediaQueryLists.forEach((mdl) => mdl.addEventListener('change', handler));

    return () => {
      mediaQueryLists.forEach((mdl) => mdl.removeEventListener('change', handler));
    };
  });

  return ['isMobile', 'isTablet', 'isBigTablet', 'isDesktop'].reduce(
    (acc, screen, index) => ({ ...acc, [screen]: values[index] }),
    {}
  );
};

export default useMatchMedia;
