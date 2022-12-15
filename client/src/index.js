import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store,persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'


import { Home, Product, Products, AboutPage, ContactPage, 
  Cart, Login, Register, Checkout, PageNotFound, Payment, 
  PaymentSuccess, Addashboard, AdHome, AdAnalytics, AdUserList, AdProductList
} from "./pages"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/admin" element={<Addashboard />} />
          <Route path="/admin/" element={<AdHome />} />
          <Route path="/admin/analytics" element={<AdAnalytics />} />
          <Route path="/admin/users" element={<AdUserList />} />
          <Route path="/admin/products" element={<AdProductList />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/product/*" element={<PageNotFound />} />
        </Routes>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);