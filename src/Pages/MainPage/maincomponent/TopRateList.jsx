import { useContext, useState } from "react";
import Mstyle from "./TopRate.module.css";
import ProductProvider from "../../../context/ProductProvider";
import Carts from "../../../components/Carts/Carts";
const TopRateList = () => {
  const { Tops } = useContext(ProductProvider);
  const [showcart, setShowCart] = useState(0);
  const nextCart = () => {
    if (showcart < Tops.length - 4) {
      setShowCart(showcart + 1);
    } else if (showcart === 6) {
      setShowCart(0);
    }
  };
  const prevCard = () => {
    if (showcart > 0) {
      setShowCart(showcart - 1);
    }
  };
  console.log(showcart);
  return (
    <div className={Mstyle.TopRated}>
      <div className={Mstyle.title}>
        <span>TOP RATED</span>
        <div className={Mstyle.MoveBtn}>
          <button onClick={prevCard}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button onClick={nextCart}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <div
        className={Mstyle.ProductList}
        style={{
          transform: `translateX(-${showcart * (100 / 10)}%)`,
        }}
      >
        {Tops?.map((data) => (
          <Carts {...data} />
        ))}
      </div>
    </div>
  );
};

export default TopRateList;
