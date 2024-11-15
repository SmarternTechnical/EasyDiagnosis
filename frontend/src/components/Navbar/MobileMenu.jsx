// MobileMenu.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const ImageData = [
  { heading: "Online Video Consultation", route: "/services/online-video-consultation" },
  { heading: "Buy Medicines", route: "/services/buy-medicines" },
  { heading: "Book Lab Tests at Home", route: "/services/book-lab-tests" },
  { heading: "Book an Ambulance", route: "/services/book-ambulance" },
  { heading: "Book an in-clinic consultation", route: "/services/in-clinic-consultation" },
  { heading: "Ask our ChatBot", route: "/services/chatbot" },
  { heading: "Your medical history", route: "/services/medical-history" },
  { heading: "COVID Care", route: "/services/covid-care" },
];

const MobileMenu = ({ isLoggedIn, handleLogout, handleLogin }) => {
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const toggleMobileDropdown = () => setMobileDropdownOpen(!mobileDropdownOpen);

  return (
    <div className="md:hidden bg-white shadow-md py-4">
      <NavLink to="/" className="block px-4 py-2 text-gray-700">Home</NavLink>
      <div className="px-4 py-2 text-gray-700 flex items-center cursor-pointer" onClick={toggleMobileDropdown}>
        Services <FaChevronDown className="ml-2" />
      </div>
      {mobileDropdownOpen && (
        <div className="pl-6 py-2">
          {ImageData.map((item) => (
            <NavLink key={item.route} to={item.route} className="block py-1 text-gray-600">{item.heading}</NavLink>
          ))}
        </div>
      )}
      <NavLink to="/appointments" className="block px-4 py-2 text-gray-700">Appointments</NavLink>
      <NavLink to="/hospital/Eye%20Care%20Hospital" className="block px-4 py-2 text-gray-700">Hospitals</NavLink>
      <NavLink to="/emergency" className="block px-4 py-2 text-gray-700">Emergency</NavLink>
      {isLoggedIn ? (
        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-700">Logout</button>
      ) : (
        <button onClick={handleLogin} className="w-full text-left px-4 py-2 text-gray-700">Login</button>
      )}
    </div>
  );
};

export default MobileMenu;
