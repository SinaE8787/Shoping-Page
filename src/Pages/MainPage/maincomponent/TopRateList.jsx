import { useContext, useState } from 'react';
import Mstyle from './TopRate.module.css';
import ProductProvider from '../../../context/ProductProvider';
import Carts from '../../../components/Carts/Carts';
const TopRateList = () => {
  const { topRateds } = useContext(ProductProvider);
  const [showcart, setShowCart] = useState(0);
  const [cartVisibel, setCartVisibel] = useState(4);
  window.addEventListener('resize', () => {
    if (window.innerWidth < 500) {
      setCartVisibel(2);
    } else if (window.innerWidth < 950) {
      setCartVisibel(3);
    }
  });
  const nextCart = () => {
    if (showcart < topRateds?.length - cartVisibel) {
      setShowCart(showcart + 1);
    } else if (showcart === topRateds?.length - cartVisibel) {
      setShowCart(0);
    }
  };
  const prevCard = () => {
    if (showcart > 0) {
      setShowCart(showcart - 1);
    }
  };
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
        {topRateds?.map((data) => (
          <Carts key={data._id} isMainPage={true} {...data} />
        ))}
      </div>
    </div>
  );
};

export default TopRateList;
