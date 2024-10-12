import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import { ProductProvider } from "./context/ProductContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <ProductProvider>
        <Router>
          <Routes>
            <Route path="" element={<ProductsPage />} />
            <Route path="cart" element={<CartPage />} />
          </Routes>
        </Router>
      </ProductProvider>
    </Provider>
  );
};

export default App;
