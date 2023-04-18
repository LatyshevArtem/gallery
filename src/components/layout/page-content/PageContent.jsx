import cn from 'classnames/bind';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const PageContent = ({ children }) => {
  return <div className={cx('page-content')}>{children}</div>;
};

export default PageContent;
