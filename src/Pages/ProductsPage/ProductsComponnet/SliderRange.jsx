import React, { useContext } from 'react';
import styles from './SliderRange.module.css';
import ReactSlider from 'react-slider';
import ProductProvider from '../../../context/ProductProvider';
import NumberRange from './NumberRange';

const SliderRange = () => {
  const { priceLimit, setPriceLimit, MIN, MAX } = useContext(ProductProvider);

  return (
    <div className={styles.sliderRange}>
      <h2 className={styles.title}>PRICE</h2>
      <div className={styles.sliderRangeBox}>
        <ReactSlider className="rangeSlider" value={priceLimit} onChange={setPriceLimit} min={MIN} max={MAX} />
      </div>
      <div className={styles.priceMinMax}>
        <NumberRange arrayNum={0} /> - <NumberRange arrayNum={1} />
      </div>
    </div>
  );
};

export default SliderRange;
