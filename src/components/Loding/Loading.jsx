import { useContext } from 'react';
import ProductProvider from '../../context/ProductProvider';
import styles from './Loading.module.css';
const Loading = () => {
  const { loading } = useContext(ProductProvider);
  return (
    loading && (
      <div className={styles.loadingOverlay}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading ...</p>
      </div>
    )
  );
};

export default Loading;
