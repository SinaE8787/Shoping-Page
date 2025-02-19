import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchProducts, getCategorys, getTopRated } from '../api/productsFetch';
import ProductProvider from './ProductProvider';

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
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [formDataError, setFormDataError] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    telephone: '',
  });
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
    fetchProducts({ signal, search: query, category }).then((data) => {
      setProducts(data);
      setFlitersArray(data);
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

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

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
        formDataError,
        setFormDataError,
        formData,
        setFormData,
      }}
    >
      {children}
    </ProductProvider.Provider>
  );
};

export default GetProducts;
