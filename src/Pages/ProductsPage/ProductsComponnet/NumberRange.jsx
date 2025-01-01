import React, { useContext, useState } from 'react';
import ProductProvider from '../../../context/ProductProvider';
import styles from './SliderRange.module.css';

const NumberRange = ({ arrayNum }) => {
  const [intervalStop, setIntervalStop] = useState(null);
  const { priceLimit, setPriceLimit, MIN, MAX } = useContext(ProductProvider);
  const rangeChanger = (minOrMax, operation) => {
    const saveLimit = setInterval(() => {
      setPriceLimit((prevRange) => {
        const newRange = [...prevRange];
        if (operation === 'increment' && newRange[minOrMax] < MAX) {
          newRange[minOrMax] += 1;
        } else if (operation === 'decrement' && newRange[minOrMax] > MIN) {
          newRange[minOrMax] -= 1;
        }
        return newRange;
      });
    }, 100);
    setIntervalStop(saveLimit);
  };
  const stopChanger = () => {
    clearInterval(intervalStop);
    setIntervalStop(null);
  };
  return (
    <div className={styles.showRange}>
      <div className={styles.range}>{priceLimit[arrayNum]}</div>
      <div className={styles.editRange}>
        <span
          onMouseDown={() => rangeChanger(arrayNum, 'increment')}
          onMouseUp={stopChanger}
          onMouseLeave={stopChanger}
        >
          +
        </span>
        <span
          onMouseDown={() => rangeChanger(arrayNum, 'decrement')}
          onMouseUp={stopChanger}
          onMouseLeave={stopChanger}
        >
          -
        </span>
      </div>
    </div>
  );
};

export default NumberRange;
