import cn from 'classnames/bind';
import { useContext } from 'react';
import ThemeContext from '../../../contexts/ThemeContext';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const PageWrapper = ({ children }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div
      className={cx('page-wrapper', {
        'page-wrapper--dark': isDarkTheme,
      })}>
      {children}
    </div>
  );
};

export default PageWrapper;
