import React from "react";
import ProductList from "./components/ProductList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditProduct from "./components/EditProduct";
import TambahProduct from "./components/TambahProduct";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/tambah" element={<TambahProduct/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

