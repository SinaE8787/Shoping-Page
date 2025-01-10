import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Carts.module.css';
import imgDefault from '../../assets/images/default.png';
import AddCartBtn from '../AddCartBtn/AddCartBtn';
const Carts = ({ _id, name, price, category, images, description, stock, isMainPage }) => {
  const [ShowAddBox, setShowAddBox] = useState(false);
  const roundedPrice = parseInt(price);
  return (
    <div
      className={`${styles.Cart} ${!isMainPage ? styles.notInHome : ''}`}
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
          <AddCartBtn
            productId={_id}
            name={name}
            img={images[0]}
            category={category?.name}
            descriptin={description}
            price={roundedPrice}
            maxQuantity={stock}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Carts;
