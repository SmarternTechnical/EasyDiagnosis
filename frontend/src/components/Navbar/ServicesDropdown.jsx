// ServicesDropdown.js
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

const ServicesDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <NavLink to="/services" className={({ isActive }) => isActive ? "text-[#1fab89] font-bold flex items-center" : "text-gray-600 flex items-center"}>
        Services <FaChevronDown className="ml-1" />
      </NavLink>
      {showDropdown && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {ImageData.map((item) => (
            <NavLink key={item.route} to={item.route} className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#1fab89] hover:text-white">{item.heading}</NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesDropdown;
