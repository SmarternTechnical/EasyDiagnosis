import React from "react";
import { Routes, Route } from "react-router-dom";

import Alziemer from "../components/audiotest/Alziemer/alziemer";
import Autism from "../components/audiotest/Autism/autism";

const ServiceRoutes = () => {
  return (
    <Routes>
      <Route index element={<Autism />} />
      
      <Route path="/autism" element={<Autism />} />
      <Route path="/alziemer" element={<Alziemer />} />
      
    </Routes>
  );
};

export default ServiceRoutes;
