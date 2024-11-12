import React from "react";
import SearchSection from "./SearchSection";
import ShopByCategory from "./ShopByCategory";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";

const Labs = () => {
  const {id} = useParams();
  return (
    <div className="w-full h-auto flex flex-col items-center">
      <div className="w-3/4 mt-10">
        <SearchSection
          heading="Consult with a Lab"
          cityOptions={["Delhi", "Mumbai", "Bangalore"]}
        />
      </div>
      <div className="w-full mt-10">
        <ShopByCategory/>
      </div>
      <div className="w-3/5 mt-10">
        <ProductGrid category={id}/>
      </div>
    </div>
  );
};
export default Labs;
