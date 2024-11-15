// Navbar.js
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { isLoggedInAtom } from "../../atoms/checkLoggedIn";
import { FaShoppingCart, FaBars, FaTimes, FaUserAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import UserProfile from "./UserProfile";
import ServicesDropdown from "./ServicesDropdown";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/logout");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleLogin = () => navigate("/login");

  return (
    <nav className="w-full h-[10%] m-1 p-2">
      <div className="container mx-auto  py-3 flex justify-between items-center">
        <div className="bg-[#1fab89] font-bold text-white text-lg p-2">LOGO</div>

        <div className="hidden md:flex items-center space-x-6 md:text-lg">
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-[#1fab89] font-bold" : "text-gray-600")}>Home</NavLink>
          <ServicesDropdown />
          <NavLink to="/appointments" className={({ isActive }) => (isActive ? "text-[#1fab89] font-bold" : "text-gray-600")}>Appointments</NavLink>
          <NavLink to="/hospital/Eye%20Care%20Hospital" className={({ isActive }) => (isActive ? "text-[#1fab89] font-bold" : "text-gray-600")}>Hospitals</NavLink>
          <NavLink to="/emergency" className={({ isActive }) => (isActive ? "text-[#1fab89] font-bold" : "text-gray-600")}>Emergency</NavLink>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1fab89]">
            <FaShoppingCart className="text-white mx-2" />
          </div>
          {isLoggedIn ? (
            <UserProfile handleLogout={handleLogout} /> // Passing handleLogout to UserProfile
          ) : (
            <button onClick={handleLogin} className="text-[#1fab89] border-[#1fab89] border-2 px-4 py-2 rounded-full flex items-center space-x-2">
              <FaUserAlt /><span>Login</span>
            </button>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#1fab89]">{isOpen ? <FaTimes /> : <FaBars />}</button>
        </div>
      </div>

      {isOpen && <MobileMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleLogin={handleLogin} />}
      <hr className="bg-white h-0 md:bg-gray-300 md:h-[0.15rem] md:mx-12 md:mt-1 opacity-35" />
    </nav>
  );
};

export default Navbar;
