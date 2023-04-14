import styles from './styles.module.scss';

const PageWrapper = ({ children }) => {
  return <div className={styles['page-wrapper']}>{children}</div>;
};

export default PageWrapper;
