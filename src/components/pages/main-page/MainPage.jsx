import PageContent from '../../layout/page-content/PageContent';
import styles from './styles.module.scss';
import Header from '../../layout/header/Header';

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
