import { useContext } from "react";
import styles from "./Category.module.css";
import ProductProvider from "../../../context/ProductProvider";
const Category = () => {
  const { categoryList, setSelectedCategories } = useContext(ProductProvider);

  const checkFilter = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  return (
    <div className={styles.categoryBox}>
      <h2 className={styles.title}>CATEGORY</h2>
      <div className={styles.categorys}>
        {categoryList?.map((category) => (
          <div key={category?._id} className={styles.category}>
            <label className={styles.label} htmlFor={category?._id}>
              <input
                className={styles.check}
                id={category?._id}
                type="checkbox"
                onClick={() => checkFilter(category?._id)}
              />
              <span className={styles.checkMark}></span>
            </label>
            <div>
              {category?.name}
              <span className={styles.productCount}>
                {"  "}({category?.productCount})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
