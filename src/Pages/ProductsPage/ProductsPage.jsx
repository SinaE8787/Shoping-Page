import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://kaaryar-ecom.liara.run/v1/products";

const ProductsPage = () => {
  const { categoryId, query } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        } else if (categoryId) {
          url = `${BASE_URL}?category=${categoryId}&page=1&limit=100`;
        } else if (query) {
          url = `${BASE_URL}?search=${query}&page=1&limit=100`;
        }

        const response = await axios.get(url, { signal });
        setProducts(response.data.products);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request aborted");
        } else {
          setError("Failed to fetch products.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, [categoryId, query, location.pathname]);
  console.log(products);
  return (
    <div>
      <h1>Products</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
