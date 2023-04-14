import styles from './style.module.scss';
import Logo from '../../ui/logo/Logo';
import ChangeThemeButton from '../../ui/change-theme-button/ChangeThemeButton';

const Header = () => {
  return (
    <header className={styles['header']}>
      <Logo />
      <ChangeThemeButton />
    </header>
  );
};

export default Header;
