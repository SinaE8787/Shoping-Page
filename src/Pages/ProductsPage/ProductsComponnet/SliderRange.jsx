import React, { useContext } from "react";
import styles from "./SliderRange.module.css";
import ReactSlider from "react-slider";
import ProductProvider from "../../../context/ProductProvider";
import NumberRange from "./NumberRange";
const MIN = 10;
const MAX = 1000;
const SliderRange = () => {
  const { priceLimit, setPriceLimit } = useContext(ProductProvider);

  return (
    <div className={styles.sliderRange}>
      <h2 className={styles.title}>PRICE</h2>
      <div className={styles.sliderRangeBox}>
        <ReactSlider
          className="rangeSlider"
          value={priceLimit}
          onChange={setPriceLimit}
          min={MIN}
          max={MAX}
        />
      </div>
      <div className={styles.priceMinMax}>
        <NumberRange arrayNum={0} /> - <NumberRange arrayNum={1} />
      </div>
    </div>
  );
};

export default SliderRange;
