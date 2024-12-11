import axios from "axios";
import ProductProvider from "./ProductProvider";
import { useEffect, useState } from "react";

const GetProducts = ({ children }) => {
  const [Products, setProducts] = useState(null);
  const [Tops, setTops] = useState(null);
  const getProducts = async () => {
    const products = axios
      .get(`https://kaaryar-ecom.liara.run/v1/products?page=1&limit=100`)
      .then((response) => setProducts(response?.data));
  };
  const getTopRated = async () => {
    const TopRated = axios
      .get(`https://kaaryar-ecom.liara.run/v1/products/top-rated`)
      .then((response) => setTops(response?.data));
  };
  useEffect(() => {
    getProducts();
    getTopRated();
  }, []);
  return (
    <ProductProvider.Provider
      value={{
        Products,
        Tops,
      }}
    >
      {children}
    </ProductProvider.Provider>
  );
};

export default GetProducts;
