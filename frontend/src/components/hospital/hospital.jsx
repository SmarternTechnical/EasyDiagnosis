import React from "react";
import SearchSection from "../services/online-video-consultation/consult-doctor/SearchSection";
import ProductGrid from "./ProductGrid"
import ShopByCategory from "./ShopByCategory";
import { useParams } from "react-router-dom";

const Hospital = () => {
  const {id} = useParams();
  return (
    <div className="w-full h-auto flex flex-col items-center">
      <div className="w-3/4 mt-10">
        <SearchSection
          heading="Hospitals"
          cityOptions={["Delhi", "Mumbai", "Bangalore"]}
        />
      </div>
      <div className="w-full mt-10">
        <ShopByCategory service="medical_services"
          category="Search for Hospitals" id={id}/>
      </div>
      <div className="w-3/5 mt-10">
        <ProductGrid category={id}/>
      </div>
    </div>
  );
};

export default Hospital;
