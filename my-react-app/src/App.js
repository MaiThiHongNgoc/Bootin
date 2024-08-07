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
import PageNotFound from './Pages/404';
import TopRating from "./Pages/Home/OurBookStore/TopRating/TopRating";
import BestSellers from "./Pages/Home/OurBookStore/BestSellers/BestSellers";
import Featured from "./Pages/Home/OurBookStore/Featured/Featured";



import Admin from "./Backend/Admin/Admin";
import UserList from "./Backend/User/UserList";
import CategoryList from "./Backend/Category/CategoryList";
import AuthorList from "./Backend/Author/AuthorList";
import ProductList from "./Backend/Product/ProductList";
import OrderList from "./Backend/order/orderList";
import OrderDetailList from "./Backend/orderDetail/orderDetailList";
import Staff from "./Backend/staff/Staff";
<<<<<<< Updated upstream
import ImageList from "./Backend/Image/ImageList";
=======
<<<<<<< HEAD
import Login from "./Pages/Login/Login";
=======
import ImageList from "./Backend/Image/ImageList";
>>>>>>> 1a10d19e0c206a4b9192c68ea7fccc7b3bb4d64d
>>>>>>> Stashed changes


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} >
          <Route path="topRating" element={<TopRating />} />
          <Route path="bestSeller" element={<BestSellers />} />
          <Route path="featured" element={<Featured />} />
          </Route>

          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/author" element={<Author />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<PageNotFound />} />
<<<<<<< Updated upstream
          
=======
<<<<<<< HEAD
          <Route path="/login" element={<Login />} />
=======
          
>>>>>>> 1a10d19e0c206a4b9192c68ea7fccc7b3bb4d64d
>>>>>>> Stashed changes




          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/category" element={<CategoryList />} />
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/order" element={<OrderList />} />
          <Route path="/orderdetail" element={<OrderDetailList />} />
          <Route path="/image" element={<ImageList />} />


          <Route path="/staff" element={<Staff />} />




        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
