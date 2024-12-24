import { useContext } from "react";
import ProductProvider from "../../context/ProductProvider";
import styles from "./AddCart.module.css";

const AddCartBtn = ({ productId, maxQuantity, setTotalPrice }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(ProductProvider);
  const quantity = cartItems[productId] || 0;
  setTotalPrice ? setTotalPrice(quantity) : "";
  return (
    <div className={styles.addCartBtn}>
      {quantity > 0 ? (
        <div className={styles.counter}>
          <button
            className={styles.minusButton}
            onClick={() => removeFromCart(productId)}
          >
            -
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button
            className={styles.plusButton}
            onClick={() => addToCart(productId, maxQuantity)}
            disabled={quantity >= maxQuantity}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className={styles.addBtn}
          onClick={() => addToCart(productId, maxQuantity)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default AddCartBtn;
