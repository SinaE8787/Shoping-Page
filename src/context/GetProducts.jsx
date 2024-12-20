import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductProvider from "./ProductProvider";
import { useDebounce } from "../hooks/useDebounce";
const BASE_URL = "https://kaaryar-ecom.liara.run/v1/products";

const GetProducts = ({ children }) => {
  ////////////////\\\\\\\\\\\\\\\\\\\
  const [Tops, setTops] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const getTopRated = async () => {
    const TopRated = axios
      .get(`https://kaaryar-ecom.liara.run/v1/products/top-rated`)
      .then((response) => setTops(response?.data));
  };
  const getCategorys = async () => {
    const Categorys = axios
      .get(`https://kaaryar-ecom.liara.run/v1/categories`)
      .then((response) => setCategoryList(response?.data));
  };
  useEffect(() => {
    getTopRated();
    getCategorys();
  }, []);

  ///////////////////////\\\\\\\\\\\\\\\\\\\\\\\
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filtersArray, setFlitersArray] = useState([]);
  const [category, setCategory] = useState();
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  //////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `${BASE_URL}?page=1&limit=100`;
        if (location.pathname === "/products") {
          url = `${BASE_URL}?page=1&limit=100`;
        } else if (category) {
          url = `${BASE_URL}?category=${category}&page=1&limit=100`;
        } else if (query) {
          url = `${BASE_URL}?search=${query}&page=1&limit=100`;
        }
        const response = await axios.get(url, { signal });
        setProducts(response?.data?.products);
        setFlitersArray(response?.data?.products);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      controller.abort();
    };
  }, [category, query]);
  //////////////////////\\\\\\\\\\\\\\\\\\\\\\\
  const [priceLimit, setPriceLimit] = useState([10, 1000]);
  const priceLimited = useDebounce(priceLimit);
  return (
    <ProductProvider.Provider
      value={{
        Tops,
        products,
        setProducts,
        loading,
        setCategory,
        setQuery,
        categoryList,
        selectedCategories,
        setSelectedCategories,
        priceLimit,
        priceLimited,
        setPriceLimit,
        filtersArray,
      }}
    >
      {children}
    </ProductProvider.Provider>
  );
};

export default GetProducts;
