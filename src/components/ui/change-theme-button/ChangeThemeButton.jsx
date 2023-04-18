import { ReactComponent as ChangeThemeButtonIcon } from '../../../assets/images/change-theme-button-icon.svg';
import styles from './styles.module.scss';

const ChangeThemeButton = () => {
  return (
    <button className={styles['change-theme-button']} type="button">
      <ChangeThemeButtonIcon />
    </button>
  );
};

export default ChangeThemeButton;
