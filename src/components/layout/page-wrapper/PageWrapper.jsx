import cn from 'classnames/bind';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const PageWrapper = ({ children }) => {
  return <div className={cx('page-wrapper')}>{children}</div>;
};

export default PageWrapper;
