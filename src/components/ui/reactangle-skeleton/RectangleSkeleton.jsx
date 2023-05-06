import { useContext } from 'react';
import ThemeContex from '../../../contexts/ThemeContext';

const BACKGROUND_COLOR = '#f3f3f3';
const FOREGROUND_COLOR = '#ecebeb';

const BACKGROUND_COLOR_DARK = '#303030';
const FOREGROUND_COLOR_DARK = '#282828';

const RectangleSkeleton = ({ rx, ry }) => {
  const { isDarkTheme } = useContext(ThemeContex);
  const backgroundColor = isDarkTheme ? BACKGROUND_COLOR_DARK : BACKGROUND_COLOR;
  const foregroundColor = isDarkTheme ? FOREGROUND_COLOR_DARK : FOREGROUND_COLOR;

  return (
    <svg width="100%" height="100%">
      <rect x="0" y="0" width="100%" height="100%" clipPath="url(#clip-path)" fill="url(#fill)" />
      <defs>
        <clipPath id="clip-path">
          <rect x="0" y="0" rx={rx} ry={ry} width="100%" height="100%" />
        </clipPath>
        <linearGradient id="fill">
          <stop offset="0.599964" stopColor={backgroundColor} stopOpacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="1.59996" stopColor={foregroundColor} stopOpacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="2.59996" stopColor={backgroundColor} stopOpacity="1">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default RectangleSkeleton;
