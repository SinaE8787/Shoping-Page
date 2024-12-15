import axios from "axios";
import ProductProvider from "./ProductProvider";
import { useEffect, useState } from "react";

const GetProducts = ({ children }) => {
  const [Products, setProducts] = useState(null);
  const [Tops, setTops] = useState(null);

  const getTopRated = async () => {
    const TopRated = axios
      .get(`https://kaaryar-ecom.liara.run/v1/products/top-rated`)
      .then((response) => setTops(response?.data));
  };
  useEffect(() => {
    getTopRated();
  }, []);
  return (
    <ProductProvider.Provider
      value={{
        Tops,
      }}
    >
      {children}
    </ProductProvider.Provider>
  );
};

export default GetProducts;
