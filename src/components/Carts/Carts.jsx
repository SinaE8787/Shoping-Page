import styles from "./Carts.module.css";
import imgDefault from "../../assets/images/default.png";
import { Link } from "react-router-dom";
import { useState } from "react";
const Carts = ({ name, price, category }) => {
  const [ShowAddBox, setShowAddBox] = useState(false);
  const roundedPrice = parseInt(price);
  return (
    <div
      className={styles.Cart}
      onMouseEnter={() => setShowAddBox((change) => (change = !change))}
      onMouseLeave={() => setShowAddBox((change) => (change = !change))}
    >
      <Link className={styles.imgBox}>
        <img src={imgDefault} />
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
          <button>Add To Cart</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Carts;
