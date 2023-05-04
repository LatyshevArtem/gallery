import cn from 'classnames/bind';
import { useContext } from 'react';
import ThemeContex from '../../../contexts/ThemeContext';
import Logo from '../../ui/logo/Logo';
import ChangeThemeButton from '../../ui/change-theme-button/ChangeThemeButton';
import styles from './style.module.scss';

const cx = cn.bind(styles);

const Header = () => {
  const { isDarkTheme } = useContext(ThemeContex);

  return (
    <header className={cx('header')}>
      <Logo />
      <ChangeThemeButton
        className={cx('change-theme-button', {
          'change-theme-button--dark': isDarkTheme,
        })}
      />
    </header>
  );
};

export default Header;
