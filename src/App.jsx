import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import Home from "./Home.jsx";
import CustomerLogin from "./CustomerLogin.jsx";
import CustomerSignup from "./CustomerSignup.jsx";
import CustomerDashboard from "./CustomerDashboard.jsx";

import SellerLogin from "./SellerLogin.jsx";
import SellerDashboard from "./SellerDashboard.jsx";

import Checkout from "./Checkout.jsx";
import OrderSuccess from "./OrderSuccess.jsx";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home/>}/>

        {/* Customer */}
        <Route path="/login/customer" element={<CustomerLogin/>}/>
        <Route path="/signup/customer" element={<CustomerSignup/>}/>
        <Route path="/customer/dashboard" element={<CustomerDashboard/>}/>

        {/* Seller */}
        <Route path="/login/seller" element={<SellerLogin/>}/>
        <Route path="/seller/dashboard" element={<SellerDashboard/>}/>

        {/* Checkout */}
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/order/success" element={<OrderSuccess/>}/>

      </Routes>
    </BrowserRouter>
  );
}
