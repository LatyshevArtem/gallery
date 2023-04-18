import cn from 'classnames/bind';
import Logo from '../../ui/logo/Logo';
import ChangeThemeButton from '../../ui/change-theme-button/ChangeThemeButton';
import styles from './style.module.scss';

const cx = cn.bind(styles);

const Header = () => {
  return (
    <header className={cx('header')}>
      <Logo />
      <ChangeThemeButton />
    </header>
  );
};

export default Header;
