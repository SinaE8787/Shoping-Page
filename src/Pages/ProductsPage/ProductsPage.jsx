import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductProvider from "../../context/ProductProvider";
import Pstyles from "./Products.module.css";
import Category from "./ProductsComponnet/Category";
import SliderRange from "./ProductsComponnet/SliderRange";
import Carts from "../../components/Carts/Carts";
const ProductsPage = () => {
  const {
    products,
    setProducts,
    loading,
    setCategory,
    setQuery,
    selectedCategories,
    priceLimited,
    filtersArray,
  } = useContext(ProductProvider);
  const { categoryId, query } = useParams();
  const [onFilter, setOnFilter] = useState([]);
  const [filterBtn, setFilterBtn] = useState(false);
  const [pageProductNumber, setPageProductNumber] = useState(1);
  const itemsPerPage = 12;
  useEffect(() => {
    setCategory(categoryId);
    setQuery(query);
  }, [categoryId, query]);

  useEffect(() => {
    setOnFilter(
      filtersArray.filter((data) => {
        const categoryFilters =
          selectedCategories.length === 0 ||
          selectedCategories.includes(data.category._id);

        const priceFliter =
          data.price >= priceLimited[0] && data.price <= priceLimited[1];

        return priceFliter & categoryFilters;
      })
    );
  }, [selectedCategories, priceLimited]);
  useEffect(() => {
    if (onFilter?.length < 1 || onFilter?.length === 100) {
      setFilterBtn(false);
    } else {
      setFilterBtn(true);
    }
  }, [onFilter]);

  const nextPage = pageProductNumber * itemsPerPage;
  const lastPage = nextPage - itemsPerPage;
  const currentProducts = products.slice(lastPage, nextPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const pageChanger = (pageNumber) => {
    setPageProductNumber(pageNumber);
  };

  return (
    <div className={Pstyles.productPage}>
      <div className={Pstyles.filterAndProducts}>
        <div className={Pstyles.filters}>
          <Category />
          <SliderRange />
          {filterBtn ? (
            <button
              onClick={() => {
                setProducts(onFilter);
                setFilterBtn(false);
              }}
              className={Pstyles.setFilterBtn}
            >
              Set Filters
            </button>
          ) : (
            ""
          )}
        </div>
        <div className={Pstyles.Products}>
          <div className={Pstyles.topFilters}></div>
          <div className={Pstyles.containerProducts}>
            <div className={Pstyles.productsGrid}>
              {currentProducts.map((product) => (
                <Carts key={product._id} {...product} />
              ))}
            </div>
            <div className={Pstyles.pagination}>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`${Pstyles.pageButton} ${
                    pageProductNumber === index + 1 ? Pstyles.active : ""
                  }`}
                  onClick={() => pageChanger(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductsPage;
