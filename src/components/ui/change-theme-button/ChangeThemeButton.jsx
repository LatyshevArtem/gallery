import cn from 'classnames/bind';
import { useContext } from 'react';
import ThemeContex from '../../../contexts/ThemeContext';
import { ReactComponent as ChangeThemeButtonIcon } from '../../../assets/images/change-theme-button-icon.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const ChangeThemeButton = ({ className }) => {
  const { toggleTheme } = useContext(ThemeContex);

  return (
    <button className={cx(className, 'change-theme-button')} onClick={toggleTheme} type="button">
      <ChangeThemeButtonIcon className={cx('change-theme-button__icon')} />
    </button>
  );
};

export default ChangeThemeButton;
