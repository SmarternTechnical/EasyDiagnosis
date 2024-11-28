// UserProfile.js
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaClipboardList,
  FaUserCog,
  FaHeartbeat,
  FaFolderOpen,
  FaBell,
  FaSlidersH,
  FaShieldAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const UserProfile = ({ email = "abc@gmail.com", name , handleLogout }) => (
  <div className="relative group z-50">
    <div className="flex items-center space-x-3 cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-[#1fab89] flex items-center justify-center hover:bg-[#16a085] transition duration-200">
        <FaUserCircle className="text-white text-2xl" />
      </div>
    </div>
    
    {/* Dropdown Menu */}
    <div className="absolute right-0 mt-2 w-64 bg-[#1fab89] rounded-2xl shadow-lg py-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transform transition-all duration-300 ease-in-out">
      {/* Welcome Message with Profile Icon */}
      <div className="flex items-center px-4 py-3 border-b border-gray-300">
        <div>
          <div className="flex items-center space-x-3">
            <FaUserCircle className="text-white text-3xl" />
            <div>
                <div className="text-white text-sm font-semibold">Welcome back</div>
                <div className="text-white text-lg font-bold">{name}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <NavLink to="/profile" className="flex items-center px-4 py-3 text-white hover:bg-[#16a085] transition duration-200">
        <FaUserCog className="mr-3" /> Profile
      </NavLink>
      <NavLink to="/my-doctors" className="flex items-center px-4 py-3 text-white hover:bg-[#16a085] transition duration-200">
        <FaHeartbeat className="mr-3" /> My Doctors
      </NavLink>
      <NavLink to="/consultation" className="flex items-center px-4 py-3 text-white hover:bg-[#16a085] transition duration-200">
        <FaClipboardList className="mr-3" /> Consultation
      </NavLink>
      <NavLink to="/medical-records" className="flex items-center px-4 py-3 text-white hover:bg-[#16a085] transition duration-200">
        <FaFolderOpen className="mr-3" /> Medical Records
      </NavLink>
      <NavLink to="/orders" className="flex items-center px-4 py-3 text-white hover:bg-[#16a085] border-b border-gray-300 transition duration-200">
        <FaClipboardList className="mr-3" /> Orders
      </NavLink>

      {/* Additional Settings */}
      <NavLink to="/notifications" className="flex items-center px-4 py-3 text-white hover:bg-[#16a085] transition duration-200">
        <FaBell className="mr-3" /> Notifications
      </NavLink>
      <NavLink to="/settings" className="flex items-center px-4 py-3 text-white hover:bg-[#16a085] transition duration-200">
        <FaSlidersH className="mr-3" /> Settings
      </NavLink>
      <NavLink to="/privacy-policy" className="flex items-center px-4 py-3 text-white hover:bg-[#16a085] border-b border-gray-300 transition duration-200">
        <FaShieldAlt className="mr-3" /> Privacy Policy
      </NavLink>

      {/* Logout Button */}
      <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-white hover:bg-[#16a085] transition duration-200">
        <FaSignOutAlt className="mr-3" /> Logout
      </button>
    </div>
  </div>
);

export default UserProfile;
