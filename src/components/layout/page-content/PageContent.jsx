import styles from './styles.module.scss';

const PageContent = ({ children }) => {
  return <div className={styles['page-content']}>{children}</div>;
};

export default PageContent;
