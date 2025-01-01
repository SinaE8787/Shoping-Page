import styles from './BasketCarts.module.css';

const BasketCarts = ({ name, stock, img }) => {
  console.log(name);
  return (
    <div className={styles.basketCart}>
      <div className={styles.imgProduct}>
        <img src={img} />
      </div>
      <div className={styles.details}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}></div>
      </div>
      <div className={styles.editProduct}>
        <div></div>
        <div className={styles.price}></div>
      </div>
    </div>
  );
};

export default BasketCarts;
