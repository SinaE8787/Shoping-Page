import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ProductProvider from "./ProductProvider";
const BASE_URL = "https://kaaryar-ecom.liara.run/v1/products";

const GetProducts = ({ children }) => {
  ////////////////\\\\\\\\\\\\\\\\\\\
  const [Tops, setTops] = useState(null);
  const getTopRated = async () => {
    const TopRated = axios
      .get(`https://kaaryar-ecom.liara.run/v1/products/top-rated`)
      .then((response) => setTops(response?.data));
  };
  useEffect(() => {
    getTopRated();
  }, []);
  ///////////////////////\\\\\\\\\\\\\\\\\\\\\\\
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
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
        setProducts(response.data.products);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      controller.abort();
    };
  }, [category, query]);
  return (
    <ProductProvider.Provider
      value={{
        Tops,
        products,
        loading,
        setCategory,
        setQuery,
      }}
    >
      {children}
    </ProductProvider.Provider>
  );
};

export default GetProducts;
