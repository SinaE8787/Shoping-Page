import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainPage from "./Pages/MainPage/MainPage";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";
import BasketPage from "./Pages/BasketPage/BasketPage";
import Loading from "./components/Loding/Loading";

function App() {
  return (
    <div className="allFather">
      <Loading />
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/products/category/:categoryId"
            element={<ProductsPage />}
          />
          <Route path="/products/search/:query" element={<ProductsPage />} />
          <Route path="/product/:name" element={<SingleProduct />} />
          <Route path="/basket" element={<BasketPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
