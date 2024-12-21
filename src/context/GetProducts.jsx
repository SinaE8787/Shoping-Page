import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductProvider from "./ProductProvider";
import { useDebounce } from "../hooks/useDebounce";
const BASE_URL = "https://kaaryar-ecom.liara.run/v1/products";
const MIN = 10;
const MAX = 1000;
const DEFAULT_SORT_BY = "default";
const HIGH_TO_LOW_SORT_BY = "highToLow";
const LOW_TO_HIGH_SORT_BY = "lowToHigh";
const GetProducts = ({ children }) => {
  ////////////////get categorys an topreted\\\\\\\\\\\\\\\\\\\
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

  ///////////////////////request to api for defrent location\\\\\\\\\\\\\\\\\\\\\\\
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filtersArray, setFlitersArray] = useState([]);
  const [category, setCategory] = useState();
  const [query, setQuery] = useState();
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
        setTimeout(() => {
          hideLoading();
        }, 750);
      }
    };
    fetchProducts();
    return () => {
      controller.abort();
    };
  }, [category, query, location.pathname]);
  //////////////////////filters\\\\\\\\\\\\\\\\\\\\\\\
  const [onFilter, setOnFilter] = useState([]);
  const [priceLimit, setPriceLimit] = useState([MIN, MAX]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState(DEFAULT_SORT_BY);
  const [useFilterBtn, SetUseFilterBtn] = useState(false);
  const priceLimited = useDebounce(priceLimit);
  const showBtn = () => SetUseFilterBtn(true);
  useEffect(() => {
    setOnFilter(
      filtersArray.filter((data) => {
        const categoryFilters =
          selectedCategories.length === 0 ||
          selectedCategories.includes(data?.category?._id);

        const priceFliter =
          data?.price >= priceLimited[0] && data?.price <= priceLimited[1];

        return priceFliter & categoryFilters;
      })
    );
  }, [selectedCategories, priceLimited, sortOrder]);

  useEffect(() => {
    if (sortOrder === HIGH_TO_LOW_SORT_BY) {
      setProducts(onFilter.sort((a, b) => b.price - a.price));
    } else if (sortOrder === LOW_TO_HIGH_SORT_BY) {
      setProducts(onFilter.sort((a, b) => a.price - b.price));
    }
  }, [sortOrder]);
  useEffect(() => {
    if (products.length === onFilter.length) {
      SetUseFilterBtn(false);
    } else if (products.length > 1 && onFilter.length < 1) {
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
  ///////////////loading\\\\\\\\\\\\\\\
  const [loading, setLoading] = useState(false);
  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);
  const loadingProcess = () => {
    showLoading();
    setTimeout(() => {
      hideLoading();
    }, 1000);
  };
  return (
    <ProductProvider.Provider
      value={{
        MIN,
        MAX,
        DEFAULT_SORT_BY,
        HIGH_TO_LOW_SORT_BY,
        LOW_TO_HIGH_SORT_BY,
        Tops,
        products,
        setProducts,
        setCategory,
        setQuery,
        categoryList,
        selectedCategories,
        setSelectedCategories,
        priceLimit,
        priceLimited,
        setPriceLimit,
        location,
        onFilter,
        sortOrder,
        setSortOrder,
        useFilterBtn,
        loading,
        loadingProcess,
      }}
    >
      {children}
    </ProductProvider.Provider>
  );
};

export default GetProducts;
