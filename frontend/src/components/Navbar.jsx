
import React, { useContext, useState } from "react";
import {
  FaShoppingCart,
  FaUserAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import isLoggedInContext from "../Context/IsLoggedInContext";
import UserContext from "../Context/UserContext";

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

const UserProfile = ({ email }) => {
  return (
    <div className="relative group">
      <div className="flex items-center space-x-2 cursor-pointer">
        <div className="w-8 h-8 rounded-full bg-[#1fab89] flex items-center justify-center">
          <FaUserCircle className="text-white text-xl" />
        </div>
        <span className="text-gray-700">User</span>
      </div>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
        <div className="px-4 py-2 text-sm text-gray-700 border-b">
          {email || "abc@gmail.com"}
        </div>
        <NavLink
          to="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#1fab89] hover:text-white"
        >
          Profile Settings
        </NavLink>
        <NavLink
          to="/orders"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#1fab89] hover:text-white"
        >
          My Orders
        </NavLink>
      </div>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const {isLoggedIn,setIsLoggedIn} = useContext(isLoggedInContext);
  const {user,setUser}  = useContext(UserContext);
  console.log("home page ka user: " + user+" is logged in "+ isLoggedIn);
  let timeoutId;

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleMobileDropdown = () => setMobileDropdownOpen(!mobileDropdownOpen);

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  const handleLogout = async () => {
    try {
      // await axios.post("http://127.0.0.1:8000/logout");
      setIsLoggedIn(false);
      setUser('');
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="w-full h-[10%] m-1 p-2">
      <div className="container mx-auto lg:px-20 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="bg-[#1fab89] font-bold text-white text-lg p-2">
          LOGO
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 md:text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#1fab89] font-bold" : "text-gray-600"
            }
          >
            Home
          </NavLink>

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
            to="/hospital/Eye%20Care%20Hospital"
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

        {/* Right Side - Cart, Login/Profile */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Cart */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1fab89]">
            <FaShoppingCart className="text-white mx-2" />
          </div>

          {/* Login/Profile */}
          {isLoggedIn ? (
            <>
              <UserProfile />
              <button
                onClick={handleLogout}
                className="text-[#1fab89] border-[#1fab89] border-2 px-4 py-2 rounded-full flex items-center space-x-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="text-[#1fab89] border-[#1fab89] border-2 px-4 py-2 rounded-full flex items-center space-x-2"
            >
              <FaUserAlt />
              <span>Login</span>
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
            to="/hospital"
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

          {/* Mobile Auth Section */}
          <div className="px-4 py-2 border-t">
            {isLoggedIn ? (
              <div className="space-y-2">
                <UserProfile />
                <button
                  onClick={handleLogout}
                  className="w-full text-[#1fab89] border-[#1fab89] border-2 px-4 py-2 rounded-full flex items-center justify-center space-x-2"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full text-[#1fab89] border-[#1fab89] border-2 px-4 py-2 rounded-full flex items-center justify-center space-x-2"
              >
                <FaUserAlt />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      )}
      <hr className="bg-white h-0 md:bg-gray-300 md:h-[0.15rem] md:mx-12 md:mt-1 opacity-35" />
    </nav>
  );
};

export default Navbar;