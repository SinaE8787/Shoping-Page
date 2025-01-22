import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductProvider from '../../context/ProductProvider';
import Pstyles from './Products.module.css';
import Category from './ProductsComponnet/Category';
import SliderRange from './ProductsComponnet/SliderRange';
import Carts from '../../components/Carts/Carts';
import SortByFilters from './ProductsComponnet/SortByFilters';
import { useDebounce } from '../../hooks/useDebounce';

const PAGE_NUMBER = 1;
const MIN_ITEM_PER_PAGE = 6;
const DEFAULT_ITEM_PER_PAGE = 12;
const MAX_ITEM_PER_PAGE = 18;
const DEFAULT_SORT_BY = 'default';
const HIGH_TO_LOW_SORT_BY = 'highToLow';
const LOW_TO_HIGH_SORT_BY = 'lowToHigh';

const ProductsPage = () => {
  const {
    MIN,
    MAX,
    products,
    setProducts,
    setCategory,
    setQuery,
    location,
    loadingProcess,
    selectedCategories,
    setSelectedCategories,
    priceLimit,
    setPriceLimit,
    filtersArray,
  } = useContext(ProductProvider);

  const { categoryId, query } = useParams();
  const [pageProductNumber, setPageProductNumber] = useState(PAGE_NUMBER);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEM_PER_PAGE);
  const [onFilter, setOnFilter] = useState([]);
  const [sortOrder, setSortOrder] = useState(DEFAULT_SORT_BY);
  const [useFilterBtn, SetUseFilterBtn] = useState(false);

  const priceLimited = useDebounce(priceLimit);
  const nextPage = pageProductNumber * itemsPerPage;
  const lastPage = nextPage - itemsPerPage;
  const totalPage = Math.ceil(products?.length / itemsPerPage);
  const currentProducts = products?.slice(lastPage, nextPage);

  useEffect(() => {
    setCategory('');
  }, []);

  useEffect(() => {
    setCategory(categoryId);
    setQuery(query);
    setSortOrder(DEFAULT_SORT_BY);
  }, [categoryId, query]);

  useEffect(() => {
    setOnFilter(
      filtersArray?.filter((data) => {
        const categoryFilters = selectedCategories.length === 0 || selectedCategories.includes(data?.category?._id);

        const priceFliter = data?.price >= priceLimited[0] && data?.price <= priceLimited[1];

        return priceFliter & categoryFilters;
      }),
    );
  }, [selectedCategories, priceLimited]);

  useEffect(() => {
    if (sortOrder === HIGH_TO_LOW_SORT_BY) {
      setProducts(onFilter.sort((a, b) => b.price - a.price));
    } else if (sortOrder === LOW_TO_HIGH_SORT_BY) {
      setProducts(onFilter.sort((a, b) => a.price - b.price));
    }
  }, [sortOrder]);

  useEffect(() => {
    if (products?.length === onFilter?.length) {
      SetUseFilterBtn(false);
    } else if (products?.length > 1 && onFilter?.length < 1) {
      SetUseFilterBtn(false);
    } else {
      SetUseFilterBtn(true);
    }
  }, [products, onFilter]);

  useEffect(() => {
    setSelectedCategories([]);
    setSortOrder(DEFAULT_SORT_BY);
    setPriceLimit([MIN, MAX]);
  }, [location.pathname]);

  const pageChanger = (pageNumber) => {
    setPageProductNumber(pageNumber);
    loadingProcess();
  };
  return (
    <div className={Pstyles.productPage}>
      <div className={Pstyles.filterAndProducts}>
        <div className={Pstyles.filters}>
          {location.pathname === '/products' ? <Category /> : ''}
          <SliderRange />
          {useFilterBtn ? (
            <button
              onClick={() => {
                setProducts(onFilter);
                loadingProcess();
                setSortOrder(DEFAULT_SORT_BY);
              }}
              className={Pstyles.setFilterBtn}
            >
              Set Filters
            </button>
          ) : (
            ''
          )}
        </div>
        <div className={Pstyles.Products}>
          <div className={Pstyles.topFilters}>
            <SortByFilters
              stateName={sortOrder}
              stateChanger={setSortOrder}
              functionHandel={loadingProcess}
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
              {currentProducts?.map((product) => (
                <Carts key={product._id} {...product} />
              ))}
            </div>
            <div className={Pstyles.paginationCounter}>
              <div>
                {pageProductNumber} of {totalPage}
              </div>
              <div className={Pstyles.pagination}>
                {pageProductNumber > 1 ? (
                  <button className={Pstyles.pageButton} onClick={() => pageChanger(pageProductNumber - 1)}>
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                ) : (
                  ''
                )}
                <button className={`${Pstyles.pageButton} ${Pstyles.active}`}>{pageProductNumber}</button>
                {pageProductNumber === totalPage ? (
                  ''
                ) : (
                  <button className={Pstyles.pageButton} onClick={() => pageChanger(pageProductNumber + 1)}>
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductsPage;
