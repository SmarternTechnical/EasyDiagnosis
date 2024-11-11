import React from "react";
import DiscountCarousel from "./DiscountCarousel";
import SpecialtiesCarousel from "./PopularProductCarousel";
const LabLandingPage = () => {
  return (
    <div className="bg-[#F3F3F3] flex flex-col items-center p-12 pl-32 text-center">
      <div className=" font-inter text-[35px] font-bold tracking[-0.03em] text-left text-[#19456B] w-full mb-10">
        All Offers
      </div>
      <DiscountCarousel />
      <SpecialtiesCarousel
        service="medical_services"
        category="Book Lab Tests"
      />
    </div>
  );
};

export default LabLandingPage;
