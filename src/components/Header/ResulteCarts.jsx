import styles from './Header.module.css';
const ResulteCarts = ({ images, name }) => {
  return (
    <div className={styles.resulteCart}>
      <img src={images[0]} />
      <div>{name}</div>
    </div>
  );
};

export default ResulteCarts;
