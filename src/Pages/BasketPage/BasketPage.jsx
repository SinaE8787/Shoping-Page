import { useContext } from 'react';
import styles from './Basket.module.css';
import BillingFormData from './BasketComponents/BillingFormData';
import ProductProvider from '../../context/ProductProvider';
import BasketCarts from './BasketComponents/BasketCarts';
const BasketPage = () => {
  const { cartItems } = useContext(ProductProvider);
  return (
    <div className={styles.basketContainer}>
      <dir>
        <div className={styles.finishBuying}>
          {/* {cartItems?.map((data) => {
            <BasketCarts key={data.id} {...data} />;
          })} */}
        </div>
        <div className={styles.userData}>
          <BillingFormData />
        </div>
      </dir>
    </div>
  );
};

export default BasketPage;
