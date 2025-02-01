import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import SearchSection from "../../services/online-video-consultation/consult-doctor/SearchSection";
import ProductGrid from "./DetailsGrid";
import Sidebar from "./Sidebar";

const HospitalDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hospitalName = queryParams.get("name");
  const hospitalLocation = queryParams.get("location");
  const [selectedCategory, setSelectedCategory] = useState("doctors");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-full h-auto flex flex-col items-center">
      <div className="w-3/4 mt-10">
        <SearchSection
          heading={hospitalName}
          subheading={hospitalLocation}
          cityOptions={["Delhi", "Mumbai", "Bangalore"]}
        />
      </div>

      {/* Parent div of product grid and sidebar */}
      <div className="w-full h-[50%] flex">
        {/* Sidebar div */}
        <div className="mt-2 pl-4 w-1/4">
          <Sidebar onCategorySelect={handleCategorySelect} />
        </div>

        {/* Product Grid div */}
        <div className="w-4/5 mt-10">
          <div>
            <h1 className="text-[#19456B] text-2xl font-bold">
              Manage Hospital Staff Efficiently
            </h1>
            <h2 className="text-[#5D5D5D]">
              Access detailed information about hospital staff, including roles,
              departments, and
            </h2>
            <h2 className="text-[#5D5D5D]">
              availability. Use filters to search, view, and manage staff
              records easily.
            </h2>
          </div>

          {/* Display selected category */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-[#1FAB89]">
              Showing results for:{" "}
              {selectedCategory
                ? selectedCategory.charAt(0).toUpperCase() +
                  selectedCategory.slice(1)
                : "None"}
            </h2>
          </div>

          {/* Product Grid */}
          {selectedCategory === "doctors" && <ProductGrid category={id} />}
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;
