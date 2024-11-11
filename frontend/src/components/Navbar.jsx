import React, { useState } from "react";
import {
  FaShoppingCart,
  FaUserAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ImageData = [
  {
    heading: "Online Video Consultation",
    route: "/services/online-video-consultation",
  },
  { heading: "Buy Medicines", route: "/services/buy-medicines" },
  { heading: "Book Lab Tests at Home", route: "/services/book-lab-tests" },
  { heading: "Book an Ambulance", route: "/services/book-ambulance" },
  {
    heading: "Book an in-clinic consultation",
    route: "/services/in-clinic-consultation",
  },
  { heading: "Ask our ChatBot", route: "/services/chatbot" },
  { heading: "Your medical history", route: "/services/medical-history" },
  { heading: "COVID Care", route: "/services/covid-care" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  let timeoutId;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  return (
    <nav className="w-full h-[10%] m-1 p-2">
      <div className="container mx-auto lg:px-20 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="bg-[#1fab89] font-bold text-white text-lg p-2">
          LOGO
        </div>

        {/* Menu for larger screens */}
        <div className="hidden md:flex items-center space-x-6 md:text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#1fab89] font-bold" : "text-gray-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              isActive ? "text-[#1fab89] font-bold" : "text-gray-600"
            }
          >
            Appointments
          </NavLink>

          {/* Services with dropdown */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? "text-[#1fab89] font-bold flex items-center"
                  : "text-gray-600 flex items-center"
              }
            >
              Services <FaChevronDown className="ml-1" />
            </NavLink>
            {showDropdown && (
              <div className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                {ImageData.map((item) => (
                  <NavLink
                    key={item.route}
                    to={item.route}
                    className="block px-4 py-2 text-gray-700 hover:bg-[#1fab89] hover:text-white"
                  >
                    {item.heading}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/hospital"
            className={({ isActive }) =>
              isActive ? "text-[#1fab89] font-bold" : "text-gray-600"
            }
          >
            Hospitals
          </NavLink>
          <NavLink
            to="/emergency"
            className={({ isActive }) =>
              isActive ? "text-[#1fab89] font-bold" : "text-gray-600"
            }
          >
            Emergency
          </NavLink>
        </div>

        {/* Cart and Login Button */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1fab89]">
            <FaShoppingCart className="text-white mx-2 " />
          </div>
          <NavLink to="/login">
            <button className="flex items-center text-[#1fab89] border-[#1fab89] border-2 px-3 py-2 rounded-full">
              <FaUserAlt className="mr-1 font-bold" /> Login
            </button>
          </NavLink>
        </div>

        {/* Hamburger Icon for smaller screens */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-[#1fab89]">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md py-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-2 ${
                isActive ? "text-[#1fab89] font-bold" : "text-gray-600"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              `block px-4 py-2 ${
                isActive ? "text-[#1fab89] font-bold" : "text-gray-600"
              }`
            }
          >
            Appointments
          </NavLink>

          {/* Services Dropdown for Mobile */}
          <div className="px-4 py-2">
            <button
              onClick={toggleMobileDropdown}
              className="flex items-center w-full text-gray-600"
            >
              Services <FaChevronDown className="ml-1" />
            </button>
            {mobileDropdownOpen && (
              <div className="mt-2 ml-4">
                {ImageData.map((item) => (
                  <NavLink
                    key={item.route}
                    to={item.route}
                    className="block px-4 py-2 text-gray-700 hover:bg-[#1fab89] hover:text-white rounded-md"
                  >
                    {item.heading}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/hospitals"
            className={({ isActive }) =>
              `block px-4 py-2 ${
                isActive ? "text-[#1fab89] font-bold" : "text-gray-600"
              }`
            }
          >
            Hospitals
          </NavLink>
          <NavLink
            to="/emergency"
            className={({ isActive }) =>
              `block px-4 py-2 ${
                isActive ? "text-[#1fab89] font-bold" : "text-gray-600"
              }`
            }
          >
            Emergency
          </NavLink>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <FaShoppingCart className="text-[#1fab89]" />
            <button className="flex items-center text-[#1fab89] border border-[#1fab89] px-3 py-1 rounded-full">
              <FaUserAlt className="mr-1" /> Login
            </button>
          </div>
        </div>
      )}
      <hr className="bg-white h-0 md:bg-gray-300 md:h-[0.15rem] md:mx-12 md:mt-1 opacity-35" />
    </nav>
  );
};

export default Navbar;
