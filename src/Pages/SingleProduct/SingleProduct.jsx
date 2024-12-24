import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductProvider from "../../context/ProductProvider";
import SliderImages from "./SinglesComponents/SliderImages";
import AddCartBtn from "../../components/AddCartBtn/AddCartBtn";
import styles from "./Product.module.css";
const SingleProduct = () => {
  const { setSinglePage, findProduct } = useContext(ProductProvider);
  const [activeImage, setActiveImage] = useState(0);
  const [totalPrice, setTotalPrice] = useState();
  const productName = useParams().name;
  const roundedPrice = parseInt(
    totalPrice ? totalPrice * findProduct?.price : findProduct?.price
  );
  useEffect(() => {
    setSinglePage(productName);
  }, []);
  return (
    <div className={styles.productAllPage}>
      <div className={styles.productsAndCategois}>
        <div className={styles.product}>
          <div className={styles.sliderAndImages}>
            <div className={styles.imgBox}>
              <img src={findProduct?.images[activeImage]} />
            </div>
            <div className={styles.imageSlider}>
              <SliderImages
                images={findProduct?.images}
                activeImage={activeImage}
                setActiveImage={setActiveImage}
              />
            </div>
          </div>
          <div className={styles.productDetails}>
            <div className={styles.details}>
              <div className={styles.productName}>{findProduct?.name}</div>
              <div className={styles.productPrice}>
                <span className={styles.price}>
                  <i className="fa-solid fa-dollar-sign"></i>
                  {roundedPrice}.00
                </span>
                <span className={styles.inStock}>
                  <span>{findProduct?.stock}</span> IN STOCK
                </span>
              </div>
              <div className={styles.description}>
                {findProduct?.description}
              </div>
            </div>
            <div className={styles.addBox}>
              <AddCartBtn
                productId={findProduct?._id}
                maxQuantity={findProduct?.stock}
                setTotalPrice={setTotalPrice}
              />
            </div>
            <div className={styles.categoryAndShare}>
              <div>
                <span>CATEGORY :</span>
                <span>{findProduct?.category?.name}</span>
              </div>
              <div>
                <span>SHARE :</span>
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-google-plus-g"></i>
                <i className="fa-solid fa-envelope"></i>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.related}></div>
      </div>
    </div>
  );
};

export default SingleProduct;
