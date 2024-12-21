import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductProvider from "../../context/ProductProvider";
import Pstyles from "./Products.module.css";
import Category from "./ProductsComponnet/Category";
import SliderRange from "./ProductsComponnet/SliderRange";
import Carts from "../../components/Carts/Carts";
import SortByFilters from "./ProductsComponnet/SortByFilters";
const PAGE_NUMBER = 1;
const MIN_ITEM_PER_PAGE = 6;
const DEFAULT_ITEM_PER_PAGE = 12;
const MAX_ITEM_PER_PAGE = 18;

const ProductsPage = () => {
  const {
    products,
    setProducts,
    setCategory,
    setQuery,
    location,
    onFilter,
    sortOrder,
    setSortOrder,
    useFilterBtn,
    DEFAULT_SORT_BY,
    HIGH_TO_LOW_SORT_BY,
    LOW_TO_HIGH_SORT_BY,
    loadingProcess,
    showBtn,
  } = useContext(ProductProvider);
  const { categoryId, query } = useParams();
  const [pageProductNumber, setPageProductNumber] = useState(PAGE_NUMBER);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEM_PER_PAGE);

  useEffect(() => {
    setCategory(categoryId);
    setQuery(query);
  }, [categoryId, query]);

  const nextPage = pageProductNumber * itemsPerPage;
  const lastPage = nextPage - itemsPerPage;
  const totalPage = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(lastPage, nextPage);
  const pageChanger = (pageNumber) => {
    setPageProductNumber(pageNumber);
  };
  return (
    <div className={Pstyles.productPage}>
      <div className={Pstyles.filterAndProducts}>
        <div className={Pstyles.filters}>
          {location.pathname === "/products" ? <Category /> : ""}
          <SliderRange />
          {useFilterBtn ? (
            <button
              onClick={() => {
                setProducts(onFilter);
                loadingProcess();
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
          <div className={Pstyles.topFilters}>
            <SortByFilters
              stateName={sortOrder}
              stateChanger={setSortOrder}
              functionHandel={showBtn}
              Defualt={DEFAULT_SORT_BY}
              value2={LOW_TO_HIGH_SORT_BY}
              value3={HIGH_TO_LOW_SORT_BY}
            />
            <SortByFilters
              stateName={itemsPerPage}
              stateChanger={setItemsPerPage}
              functionHandel={loadingProcess}
              Defualt={DEFAULT_ITEM_PER_PAGE}
              value2={MIN_ITEM_PER_PAGE}
              value3={MAX_ITEM_PER_PAGE}
            />
          </div>
          <div className={Pstyles.containerProducts}>
            <div className={Pstyles.productsGrid}>
              {currentProducts.map((product) => (
                <Carts key={product._id} {...product} />
              ))}
            </div>
            <div className={Pstyles.pagination}>
              {Array.from({ length: totalPage }, (_, index) => (
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
