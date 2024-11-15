
import React from "react";
import { useParams } from "react-router-dom"; // Import useParams hook
import ProductFilter from "./ProductFilter";
import ProductGrid from "./ProductGrid";
import SearchSelection from "../SearchSelection";

const Products = () => {
  const {id} = useParams(); 

  return (
    <div>
      <SearchSelection
        heading="Buy Medicines & Essentials"
        subheading="Search For Medicines & Essentials"
        cityOptions={["Delhi", "Mumbai", "Bangalore"]}
        button1Text="Order via Prescription"
        button2Text="Don't have a Prescription"
        features={[
          "100% Genuine Medicines",
          "Trusted Pharmacies",
          "Door To Door Delivery",
        ]}
      />
      <div className="w-full h-auto mt-8 bg-[#f3f3f3] flex-row justify-center">
        <div className="w-full h-auto flex flex-col items-center lg:flex-row lg:justify-between lg:items-start p-4 bg-[#f3f3f3] lg:gap-5 pb-8 mx-auto">
          <ProductFilter />
          <ProductGrid category={id} />
        </div>
      </div>
    </div>
  );
};

export default Products;
