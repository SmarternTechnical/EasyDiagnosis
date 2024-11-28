import React, { useContext, useState } from "react";
import {
  FaShoppingCart,
  FaUserAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import isLoggedInContext from "../Context/IsLoggedInContext";
import UserContext from "../Context/UserContext";
import UserProfile from "./Dropdown/UserProfile";

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

const ImageData2 = [
  {
    heading: "Autism",
    route: "/services/autism-support",
  },
  { heading: "Alzheimer’s", route: "/services/alzheimers-support" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const { user, setUser } = useContext(UserContext);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleMobileDropdown = () => setMobileDropdownOpen(!mobileDropdownOpen);

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser("");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate("/");
  };

  const handleLogin = () => navigate("/login");

  return (
    <nav className="w-full h-[10%] bg-white shadow-md">
      <div className="container mx-auto lg:px-20 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="bg-[#1fab89] font-bold text-white text-lg p-2">
          LOGO
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#1fab89] font-bold" : "text-gray-600"
            }
          >
            Home
          </NavLink>

          {/* AudioTest Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink
              to="/audiotest"
              className={({ isActive }) =>
                isActive
                  ? "text-[#1fab89] font-bold flex items-center"
                  : "text-gray-600 flex items-center"
              }
            >
              AudioTest <FaChevronDown className="ml-1" />
            </NavLink>
            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                {ImageData2.map((item) => (
                  <NavLink
                    key={item.route}
                    to={item.route}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#1fab89] hover:text-white"
                  >
                    {item.heading}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Services Dropdown */}
          <div
            className="relative"
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
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                {ImageData.map((item) => (
                  <NavLink
                    key={item.route}
                    to={item.route}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#1fab89] hover:text-white"
                  >
                    {item.heading}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              isActive ? "text-[#1fab89] font-bold" : "text-gray-600"
            }
          >
            Appointments
          </NavLink>

          <NavLink
            to="/hospitals"
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

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Cart */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1fab89]">
            <FaShoppingCart className="text-white" />
          </div>

          {/* Login/Profile */}
          {isLoggedIn ? (
            <UserProfile name={user} handleLogout={handleLogout} />
          ) : (
            <button
              onClick={handleLogin}
              className="text-[#1fab89] border-[#1fab89] border-2 px-4 py-2 rounded-full flex items-center"
            >
              <FaUserAlt className="mr-2" />
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#1fab89]">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white py-4">
          <NavLink to="/" className="block px-4 py-2 text-gray-600">
            Home
          </NavLink>
          <NavLink to="/appointments" className="block px-4 py-2 text-gray-600">
            Appointments
          </NavLink>

          {/* Mobile Services Dropdown */}
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

          <NavLink to="/hospitals" className="block px-4 py-2 text-gray-600">
            Hospitals
          </NavLink>
          <NavLink to="/emergency" className="block px-4 py-2 text-gray-600">
            Emergency
          </NavLink>

          {/* Mobile Auth Section */}
          <div className="px-4 py-2 border-t">
            {isLoggedIn ? (
              <UserProfile handleLogout={handleLogout} />
            ) : (
              <button
                onClick={handleLogin}
                className="w-full text-[#1fab89] border-[#1fab89] border-2 px-4 py-2 rounded-full flex items-center justify-center"
              >
                <FaUserAlt className="mr-2" />
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
