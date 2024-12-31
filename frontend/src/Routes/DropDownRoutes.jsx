import React from "react";
import { Routes, Route } from "react-router-dom";

import Profile from "../components/Dropdown/Profile/Profile";

const DropDownRoutes = () => {
  return (
    <Routes>
      <Route index element={<Profile />} />
      
      <Route path="/profile" element={<Profile />} />
      
    </Routes>
  );
};

export default DropDownRoutes;
