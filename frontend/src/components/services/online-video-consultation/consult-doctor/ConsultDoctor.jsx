import React from "react";
import SearchSection from "./SearchSection";
import ShopByCategory from "./ShopByCategory";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";


const ConsultDoctorr = () => {
  const {id} = useParams();
  return (
    <div className="w-full h-auto flex flex-col items-center">
      <div className="w-3/4 mt-10">
        <SearchSection
          heading="Consult with a Doctor"
          cityOptions={["Delhi", "Mumbai", "Bangalore"]}
        />
      </div>
      <div className="w-full mt-10">
        <ShopByCategory service="medical_services"
          category="Video Consultation" id={id}/>
      </div>
      
      <div className="w-3/5 mt-10">
        <ProductGrid category={id}/>
      </div>
      
    </div>
  );
};  

const ConsultDoctor = ()=>{
  return(  
    <ConsultDoctorr/>
  );
}



export default ConsultDoctor;
