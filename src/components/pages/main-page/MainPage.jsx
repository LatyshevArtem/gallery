import cn from 'classnames/bind';
import PageContent from '../../layout/page-content/PageContent';
import Header from '../../layout/header/Header';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const MainPage = () => {
  return (
    <PageContent>
      <div className={cx('header-wrapper')}>
        <Header />
      </div>
    </PageContent>
  );
};

export default MainPage;
