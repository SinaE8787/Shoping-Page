import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import BillingFormData from './BasketComponents/BillingFormData';
import ProductProvider from '../../context/ProductProvider';
import BasketCarts from './BasketComponents/BasketCarts';
import styles from './Basket.module.css';

const BasketPage = () => {
  const { cartItems, setCartItems, setFormDataError, formData, setFormData } = useContext(ProductProvider);
  const navigator = useNavigate();
  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  const placeOrder = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (let key in formData) {
      if (!formData[key]) {
        newErrors[key] = 'This field is required.';
      }
    }
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (formData.telephone && !phoneRegex.test(formData.telephone)) {
      newErrors.telephone = 'Please enter a valid phone number.';
    }
    setFormDataError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      Swal.fire({
        title: 'Your order has been placed !',
        icon: 'success',
        draggable: true,
      });
      setCartItems([]);
      setFormData({});
      navigator('/');
    } else {
      Swal.fire({
        title: 'You did not enter your information correctly !',
        icon: 'error',
        draggable: true,
      });
    }
  };
  return (
    <div className={styles.basketContainer}>
      {cartItems.length > 0 ? (
        <>
          {' '}
          <div className={styles.basketForm}>
            <div className={styles.productsOrdered}>
              {cartItems?.map((data) => (
                <BasketCarts key={data.id} {...data} />
              ))}
            </div>
            <div className={styles.userData}>
              <BillingFormData />
            </div>
          </div>
          <div className={styles.finishShoping}>
            <div className={styles.totalPrice}>
              <span>total</span>
              <span>
                <i className="fa-solid fa-dollar-sign"></i>
                {totalAmount}.00
              </span>
            </div>
            <button className={styles.placer} onClick={placeOrder}>
              ORDER PLACE
            </button>
          </div>
        </>
      ) : (
        <div className={styles.notingOrdered}>
          <h2>You have not placed an order yet.</h2>
        </div>
      )}
    </div>
  );
};

export default BasketPage;
