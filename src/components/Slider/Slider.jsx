import { useEffect, useState } from "react";
import styles from "./Slider.module.css";
import DataSlide from "./DataSlide";
const Slider = () => {
  const [newSlide, setNewSlide] = useState(0);
  const NextSlide = () => {
    if (newSlide !== DataSlide.length - 1) {
      setNewSlide((nextSlide) => nextSlide + 1);
    } else if (newSlide === DataSlide.length - 1) {
      setNewSlide(0);
    }
  };
  const PrevSlide = () => {
    if (newSlide !== 0) {
      setNewSlide((nextSlide) => nextSlide - 1);
    } else if (newSlide === 0) {
      setNewSlide(DataSlide.length - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setNewSlide((nextSlide) =>
        nextSlide === DataSlide.length - 1 ? 0 : nextSlide + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [DataSlide.length]);
  return (
    <div className={styles.slider}>
      {DataSlide.map((data, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === newSlide ? styles.active : ""
          }`}
        >
          <img src={data.img} />
        </div>
      ))}
      <div className={styles.BtnContainer}>
        <button className={styles.prev} onClick={PrevSlide}>
          <span></span>
        </button>
        <button onClick={NextSlide}>
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
