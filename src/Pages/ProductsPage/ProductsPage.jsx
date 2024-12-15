import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductProvider from "../../context/ProductProvider";
const ProductsPage = () => {
  const { products, loading, setCategory, setQuery } =
    useContext(ProductProvider);
  const { categoryId, query } = useParams();
  useEffect(() => {
    setCategory(categoryId);
    setQuery(query);
  }, [categoryId, query]);
  return (
    <div>
      <h1>Products</h1>
      {loading && <p>Loading...</p>}
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
