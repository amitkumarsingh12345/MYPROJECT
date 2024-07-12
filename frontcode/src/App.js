import React, { useEffect, useState } from "react";
import Signup from "./Users/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Users/Header";
import Home from "./Users/Home";
import Logout from "./Users/Logout";
import PrivateRoute from "./Users/PrivateRoute";
import Error from "./Users/Error";
import UserLogin from "./Users/UserLogin";
import AdminLogin from "./Admin/AdminLogin";
import Order from "./Users/Order";
import Cart from "./Users/Cart";

import ProtectedAdmin from "./Admin/ProtectedAdmin";
import Products from "./Admin/Products";
import AddProduct from "./Admin/AddProduct";
import ViewProduct from "./Admin/ViewProduct";
import DeleteProduct from "./Admin/DeleteProduct";
import EditProduct from "./Admin/EditProduct";

import Categories from "./Admin/Categories";
import AddCategory from "./Admin/AddCategory";
import ViewCategory from "./Admin/ViewCategory";
import DeleteCategory from "./Admin/DeleteCategory";
import EditCategory from "./Admin/EditCategory";
import Customer from "./Admin/Customer";
import AddToCart from "./Users/AddToCart";

const App = () => {
  const [admin, setAdmin] = useState();
  useEffect(() => {
    const data = localStorage.getItem('admin');
    setAdmin(data);
  });

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/Order" element={<Order />}>Order</Route>
          <Route path="/Logout" element={<Logout />}></Route>
        </Route>

        <Route element={<ProtectedAdmin />}>
          <Route path="/Products" element={<Products />}></Route>
          <Route path="/AddProduct" element={<AddProduct />}></Route>
          <Route path="/ViewProduct/:id" element={<ViewProduct />}></Route>
          <Route path="/DeleteProduct/:id" element={<DeleteProduct />}></Route>
          <Route path="/EditProduct/:id" element={<EditProduct />}></Route>

          <Route path="/Categories" element={<Categories />}></Route>
          <Route path="/Customer" element={<Customer />}></Route>
          <Route path="/ViewCategory/:id" element={<ViewCategory />}></Route>
          <Route path="/DeleteCategory/:id" element={<DeleteCategory />}></Route>
          <Route path="/EditCategory/:id" element={<EditCategory />}></Route>
          <Route path="/AddCategory" element={<AddCategory />}></Route>
        </Route>

        <Route path="/" element={<Home />}></Route>
        <Route path="/:id" element={<Home />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>

        <Route path="/AddToCart/:id" element={<AddToCart />}></Route>
        
        <Route path="/AdminLogin" element={<AdminLogin />}></Route>
        <Route path="/UserLogin" element={<UserLogin />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
