import styles from "./SliderImages.module.css";

const SliderImages = ({ images, activeImage, setActiveImage }) => {
  const imageClickFunction = (index) => {
    setActiveImage(index);
  };
  return (
    <div className={styles.sliderContainer}>
      <button
        className={`${styles.sliderArrow} ${styles.arrowTop}`}
        onClick={() =>
          setActiveImage((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
          )
        }
      >
        <i className="fa-solid fa-chevron-up"></i>
      </button>
      <div className={styles.sliderImages}>
        {images?.map((image, index) => (
          <div
            key={index}
            className={`${styles.imageBox} ${
              activeImage === index ? styles.imageBoxActive : ""
            }`}
            onClick={() => imageClickFunction(index)}
          >
            <img
              src={image}
              alt={`Product ${index}`}
              className={styles.sliderImage}
            />
          </div>
        ))}
      </div>
      <button
        className={`${styles.sliderArrow} ${styles.arrowBottom}`}
        onClick={() =>
          setActiveImage((prevIndex) =>
            prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex
          )
        }
      >
        <i className="fa-solid fa-chevron-down"></i>
      </button>
    </div>
  );
};

export default SliderImages;
