import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";
import Service from "./pages/Service";
import AudioTest from "./pages/AudioTest";
import AudioTestRoutes from "./Routes/AudioTestRoutes";
import ServiceRoutes from "./Routes/ServiceRoutes";
import Products from "./components/services/products/Products";
import ProductViewDetail from "./components/services/products/ProductViewDetail";
import ShoppingCart from "./components/services/add-to-cart/ShoppingCart";
import ConsultDoctor from "./components/services/online-video-consultation/consult-doctor/ConsultDoctor";
import Hospital from "./components/hospital/hospital";
import Dectection from "./components/dectection/Dectection";
import DropDownRoutes from "./Routes/DropDownRoutes";
import Labs from "./components/services/book-lab-test-at-home/labs/Labs";
import DoctorDetails from "./components/services/online-video-consultation/doctor-details/DoctorDetails";
import LoginWrapper from "./Authentication/Login";
import SignUpWrapper from "./Authentication/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
const ProtectedRoute = () => {
  const userCookie = Cookies.get("accessToken");
  if (!userCookie) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<DropDownRoutes />} />
          <Route path="/services" element={<Service />}>
            <Route path="*" element={<ServiceRoutes />} />
          </Route>
          <Route path="/audiotest" element={<AudioTest />}>
            <Route path="*" element={<AudioTestRoutes />} />
          </Route>
          <Route
            path="/services/buy-medicines/products/details/:category/:id"
            element={<ProductViewDetail />}
          />
          <Route
            path="/services/online-video-consultation/consult-doctor/:id"
            element={<ConsultDoctor />}
          />
          <Route path="/services/book-lab-tests/Labs/:id" element={<Labs />} />
          <Route path="/products/shopping-cart" element={<ShoppingCart />} />
          <Route path="/hospital/:id" element={<Hospital />} />
          <Route path="/detection" element={<Dectection />} />
          <Route
            path="/services/buy-medicines/products/:id"
            element={<Products />}
          />

          {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/services/online-video-consultation/consult-doctor/doctor-details/:label/:id"
            element={<DoctorDetails />}
          />
          <Route
            path="/services/buy-medicines/products/shopping-cart"
            element={<ShoppingCart />}
          />
          {/* add more routes to protect */}
        </Route>
        </Route>
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/signup" element={<SignUpWrapper />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
