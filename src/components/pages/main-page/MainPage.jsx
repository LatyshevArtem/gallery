import PageContent from '../../layout/page-content/PageContent';
import Header from '../../layout/header/Header';
import styles from './styles.module.scss';

const MainPage = () => {
  return (
    <PageContent>
      <div className={styles['header-wrapper']}>
        <Header />
      </div>
    </PageContent>
  );
};

export default MainPage;
