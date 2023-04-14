import styles from './styles.module.scss';
import { ReactComponent as LogoImage } from '../../../assets/images/logo.svg';

const Logo = ({ href }) => {
  return (
    <a className={styles['logo']} href={href}>
      <LogoImage />
    </a>
  );
};

export default Logo;
