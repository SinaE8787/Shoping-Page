import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import GetProducts from "./context/GetProducts";
createRoot(document.getElementById("root")).render(
  <GetProducts>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GetProducts>
);
