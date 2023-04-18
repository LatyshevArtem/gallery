import { ReactComponent as LogoImage } from '../../../assets/images/logo.svg';
import styles from './styles.module.scss';

const Logo = ({ href }) => {
  return (
    <a className={styles['logo']} href={href}>
      <LogoImage />
    </a>
  );
};

export default Logo;
