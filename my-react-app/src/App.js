import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './App.css';
//import axios from 'axios';




import Home from './Pages/Home/Home';
import Shop from './Pages/Shop/Shop';
import Blog from './Pages/Blog/Blog';
import Author from './Pages/Author/Author';
import Contact from './Pages/Contact/Contact';
import PageNotFound from './Pages/404'



import Admin from "./Backend/Admin/Admin";
import UserList from "./Backend/User/UserList";
import CategoryList from "./Backend/Category/CategoryList";
import ProductList from "./Backend/Product/ProductList";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/author" element={<Author />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<PageNotFound />} />




          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/category" element={<CategoryList />} />
          <Route path="/products" element={<ProductList />} />
          




          
          
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
