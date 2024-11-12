import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";
import Service from "./pages/Service";
import ServiceRoutes from "./Routes/ServiceRoutes";
import Products from "./components/services/products/Products";
import ProductViewDetail from "./components/services/products/ProductViewDetail";
import ShoppingCart from "./components/services/add-to-cart/ShoppingCart";
import ConsultDoctor from "./components/services/online-video-consultation/consult-doctor/ConsultDoctor";
import Hospital from "./components/hospital/hospital";
import LoginPage from "./Authentication/Login";
import SignUpPage from "./Authentication/SignUp";
import Lab from "./components/lab/Lab";
import Labs from "./components/services/book-lab-test-at-home/labs/Labs";

import DoctorDetails from "./components/services/online-video-consultation/doctor details/DoctorDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/services" element={<Service />}>
            <Route path="*" element={<ServiceRoutes />} />
          </Route>
          <Route
            path="/services/buy-medicines/products/:id"
            element={<Products />}
          />
          <Route
            path="/services/buy-medicines/products/details/:id"
            element={<ProductViewDetail />}
          />
          <Route
            path="/services/buy-medicines/products/shopping-cart"
            element={<ShoppingCart />}
          />
          <Route
            path="/services/online-video-consultation/consult-doctor/:id"
            element={<ConsultDoctor />}
          />

          <Route
            path="/services/online-video-consultation/consult-doctor/doctor-details/:label/:id"
            element={<DoctorDetails />}
          />
          <Route path="/services/book-lab-tests/Labs/:id" element={<Labs />} />
          <Route path="/products/shopping-cart" element={<ShoppingCart />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="labs" element={<Lab />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
