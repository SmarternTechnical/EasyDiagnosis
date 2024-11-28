import React, { useContext, useEffect, useState } from "react";
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
  { heading: "Autism", route: "/audiotest/autism" },
  { heading: "Alzheimer", route: "/audiotest/alzheimer" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showAudioTestDropdown, setShowAudioTestDropdown] = useState(false);

  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const { user, setUser } = useContext(UserContext);

  // Ensure dropdown closes after some delay
  let dropdownTimeout = null;

  // Retrieve user and login state from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (storedUser && storedLoggedIn) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn, setUser]);

  const handleLogout = () => {
    // Clear login state
    setIsLoggedIn(false);
    setUser(null);

    // Remove data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    // Clear cookies
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    });

    // Show notification and navigate to home
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate("/");
  };

  const handleLogin = () => navigate("/login");

  const handleMouseEnter = (setDropdownState) => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setDropdownState(true);
  };

  const handleMouseLeave = (setDropdownState) => {
    dropdownTimeout = setTimeout(() => setDropdownState(false), 100); // 100ms delay
  };

  return (
    <nav className="w-full h-[10%] bg-white shadow-md">
      <div className="container mx-auto lg:px-20 py-3 flex justify-between items-center">
        <div className="bg-[#1fab89] font-bold text-white text-lg p-2">
          LOGO
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#1fab89] font-bold" : "text-gray-600"
            }
          >
            Home
          </NavLink>

          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter(setShowServicesDropdown)}
            onMouseLeave={() => handleMouseLeave(setShowServicesDropdown)}
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
            {showServicesDropdown && (
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

          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter(setShowAudioTestDropdown)}
            onMouseLeave={() => handleMouseLeave(setShowAudioTestDropdown)}
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
            {showAudioTestDropdown && (
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

          <NavLink
            to="/detection"
            className={({ isActive }) =>
              isActive ? "text-[#1fab89] font-bold" : "text-gray-600"
            }
          >
            Detection
          </NavLink>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-6">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1fab89] cursor-pointer"
            onClick={() =>
              navigate("/services/buy-medicines/products/shopping-cart")
            }
          >
            <FaShoppingCart className="text-white" />
          </div>

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

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#1fab89]">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
