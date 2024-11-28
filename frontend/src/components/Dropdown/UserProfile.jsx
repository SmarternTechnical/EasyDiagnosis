import React, { useState, useEffect, useRef } from "react";
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

// Profile Menu Item Component
const ProfileMenuItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className="flex items-center px-4 py-3 text-white hover:bg-[#16a085] transition duration-200"
  >
    {icon}
    {label}
  </NavLink>
);

const UserProfile = ({ email = "abc@gmail.com", name, handleLogout }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);  // State to store timeout ID
  const dropdownRef = useRef(null);

  const delay = 200; // 200ms delay before closing the dropdown

  // Open dropdown on hover
  const handleMouseEnter = () => {
    // Clear any existing timeout when mouse enters
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsDropdownVisible(true);
  };

  // Close dropdown with delay when mouse leaves
  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsDropdownVisible(false);
    }, delay);
    setTimeoutId(id); // Store the timeout ID to clear it if needed
  };

  // Handle click outside to close dropdown
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    // Listen for click events outside the dropdown to close it
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative group user-profile z-50"
      onMouseEnter={handleMouseEnter} // Open on hover
      onMouseLeave={handleMouseLeave} // Close with delay on mouse leave
    >
      <div
        className="flex items-center space-x-3 cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full bg-[#1fab89] flex items-center justify-center hover:bg-[#16a085] transition duration-200">
          <FaUserCircle className="text-white text-2xl" />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-64 bg-[#1fab89] rounded-2xl shadow-lg py-4 transform transition-all duration-300 ease-in-out"
        >
          {/* Welcome Message with Profile Icon */}
          <div className="flex items-center px-4 py-3 border-b border-gray-300">
            <FaUserCircle className="text-white text-3xl" />
            <div>
              <div className="text-white text-sm font-semibold pl-2">Welcome back</div>
              <div className="text-white text-lg font-bold">{name}</div>
            </div>
          </div>

          {/* Menu Items */}
          <ProfileMenuItem to="/profile" icon={<FaUserCog className="mr-3" />} label="Profile" />
          <ProfileMenuItem to="/my-doctors" icon={<FaHeartbeat className="mr-3" />} label="My Doctors" />
          <ProfileMenuItem to="/consultation" icon={<FaClipboardList className="mr-3" />} label="Consultation" />
          <ProfileMenuItem to="/medical-records" icon={<FaFolderOpen className="mr-3" />} label="Medical Records" />
          <ProfileMenuItem to="/orders" icon={<FaClipboardList className="mr-3" />} label="Orders" />
          <ProfileMenuItem to="/notifications" icon={<FaBell className="mr-3" />} label="Notifications" />
          <ProfileMenuItem to="/settings" icon={<FaSlidersH className="mr-3" />} label="Settings" />
          <ProfileMenuItem to="/privacy-policy" icon={<FaShieldAlt className="mr-3" />} label="Privacy Policy" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-white hover:bg-[#16a085] transition duration-200"
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
