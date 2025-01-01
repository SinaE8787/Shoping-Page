import styles from './Carts.module.css';
import imgDefault from '../../assets/images/default.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddCartBtn from '../AddCartBtn/AddCartBtn';
const Carts = ({ _id, name, price, category, images, stock }) => {
  const [ShowAddBox, setShowAddBox] = useState(false);
  const roundedPrice = parseInt(price);
  return (
    <div
      className={styles.Cart}
      onMouseEnter={() => setShowAddBox((change) => (change = !change))}
      onMouseLeave={() => setShowAddBox((change) => (change = !change))}
    >
      <Link to={`/product/${name}`} className={styles.imgBox}>
        <img src={images ? images[0] : imgDefault} />
      </Link>
      <div className={styles.productDetails}>
        <div className={styles.Category}>{category?.name}</div>
        <div className={styles.ProductName}>{name}</div>
        <div className={styles.Price}>
          <i className="fa-solid fa-dollar-sign"></i>
          {roundedPrice}.00
        </div>
      </div>
      <div className={styles.wishObject}>
        <i className=" fa-regular fa-heart"></i>
      </div>
      {ShowAddBox ? (
        <div className={styles.AddBox}>
          <AddCartBtn productId={_id} productName={name} productImg={images[0]} maxQuantity={stock} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Carts;
