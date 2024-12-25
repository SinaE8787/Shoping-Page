import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductProvider from "./ProductProvider";
import { fetchProducts, getCategorys, getTopRated } from "../api/productsFetch";
const MIN = 10;
const MAX = 1000;
const GetProducts = ({ children }) => {
  const [topRateds, setTopRateds] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [products, setProducts] = useState([]);
  const [filtersArray, setFlitersArray] = useState([]);
  const [category, setCategory] = useState();
  const [query, setQuery] = useState();
  const [priceLimit, setPriceLimit] = useState([MIN, MAX]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [singlePage, setSinglePage] = useState();
  const [cartItems, setCartItems] = useState([]);
  const productSelected = cartItems.length || 0;
  const location = useLocation();
  useEffect(() => {
    getTopRated().then((data) => {
      setTopRateds(data);
    });
    getCategorys().then((data) => {
      setCategoryList(data);
    });
  }, []);

  useEffect(() => {
    showLoading();
    const controller = new AbortController();
    const signal = controller.signal;
    fetchProducts({ signal, query, category }).then((data) => {
      setProducts(data?.products);
      setFlitersArray(data?.products);
      setTimeout(() => {
        hideLoading();
      }, 600);
    });
    return () => {
      controller.abort();
    };
  }, [category, query]);
  const [loading, setLoading] = useState(false);
  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);
  const loadingProcess = () => {
    showLoading();
    setTimeout(() => {
      hideLoading();
    }, 1000);
  };
  const findProduct = products?.find((find) => find.name === singlePage);

  return (
    <ProductProvider.Provider
      value={{
        MIN,
        MAX,
        topRateds,
        products,
        setProducts,
        setCategory,
        setQuery,
        categoryList,
        selectedCategories,
        setSelectedCategories,
        priceLimit,
        setPriceLimit,
        location,
        loading,
        loadingProcess,
        filtersArray,
        setSinglePage,
        findProduct,
        productSelected,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </ProductProvider.Provider>
  );
};

export default GetProducts;
