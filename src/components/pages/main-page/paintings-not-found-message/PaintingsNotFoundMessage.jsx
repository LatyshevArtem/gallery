import cn from 'classnames/bind';
import { useContext } from 'react';
import ThemeContex from '../../../../contexts/ThemeContext';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const PaintingsNotFoundMessage = () => {
  const { isDarkTheme } = useContext(ThemeContex);

  return (
    <div
      className={cx('message', {
        'message--dark': isDarkTheme,
      })}>
      Paintings matching the filters you specified were not found
    </div>
  );
};

export default PaintingsNotFoundMessage;
