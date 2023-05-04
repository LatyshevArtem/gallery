import cn from 'classnames/bind';
import { ReactComponent as LogoImage } from '../../../assets/images/logo.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Logo = ({ href }) => {
  return (
    <a className={cx('logo')} href={href}>
      <LogoImage />
    </a>
  );
};

export default Logo;
