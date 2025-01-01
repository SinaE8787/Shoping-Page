import { useContext } from 'react';
import ProductProvider from '../../context/ProductProvider';
import styles from './AddCart.module.css';
const DEFAULT_QUANTITY = 1;
const AddCartBtn = ({ productId, productName, productImg, maxQuantity, setTotalPrice }) => {
  const { cartItems, setCartItems } = useContext(ProductProvider);
  const isInCart = cartItems.find((item) => item.id === productId);
  setTotalPrice ? setTotalPrice(isInCart?.quantity) : '';
  const addToCart = () => {
    setCartItems((prevCart) => {
      const duplicateProduct = prevCart.findIndex((item) => item.id === productId);
      if (duplicateProduct !== -1) {
        const updatedCart = [...prevCart];
        if (updatedCart[duplicateProduct].quantity <= maxQuantity) {
          updatedCart[duplicateProduct].quantity += DEFAULT_QUANTITY;
        }
        return updatedCart;
      } else {
        return [...prevCart, { id: productId, quantity: DEFAULT_QUANTITY, name: productName, img: productImg }];
      }
    });
  };
  const removeFromCart = () => {
    setCartItems((prevCart) => {
      const duplicateProduct = prevCart.findIndex((item) => item.id === productId);
      if (duplicateProduct !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[duplicateProduct].quantity -= DEFAULT_QUANTITY;
        if (updatedCart[duplicateProduct].quantity <= 0) {
          return updatedCart.filter((item) => item.id !== productId);
        }
        return updatedCart;
      }
      return prevCart;
    });
  };
  return (
    <div className={styles.addCartBtn}>
      {isInCart ? (
        <div className={styles.counter}>
          <button className={styles.minusButton} onClick={() => removeFromCart()}>
            -
          </button>
          <span className={styles.quantity}>{isInCart?.quantity}</span>
          <button
            className={styles.plusButton}
            onClick={() => addToCart()}
            disabled={isInCart?.quantity >= maxQuantity}
          >
            +
          </button>
        </div>
      ) : (
        <button className={styles.addBtn} onClick={() => addToCart()}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default AddCartBtn;
