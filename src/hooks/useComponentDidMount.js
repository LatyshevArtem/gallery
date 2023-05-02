import { useRef, useEffect } from 'react';

const useComponentDidMount = () => {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = true;
  }, []);

  return ref.current;
};

export default useComponentDidMount;
