import styles from './BasketCarts.module.css';
import AddCartBtn from '../../../components/AddCartBtn/AddCartBtn';
const BasketCarts = ({ id, name, quantity, img, description, category, price, maxQuantity }) => {
  return (
    <div className={styles.basketCart}>
      <div className={styles.imgProduct}>
        <img src={img} />
      </div>
      <div className={styles.details}>
        <div className={styles.name}>{name}</div>
        <div className={styles.category}>{category}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.editProduct}>
        <AddCartBtn productId={id} maxQuantity={maxQuantity} />
        <div className={styles.price}>
          <i className="fa-solid fa-dollar-sign"></i>
          {quantity * price}.00
        </div>
      </div>
    </div>
  );
};

export default BasketCarts;
