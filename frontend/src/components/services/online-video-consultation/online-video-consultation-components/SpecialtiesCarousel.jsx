import React, { useState } from "react";
import Specialties from "./Specialties";
import Popup from "../../../Popup";

const SpecialtiesCarousel = ({ heading, subHeading, color }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [categories, setCategories] = useState([]); 

  const handleViewAllClick = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={`w-full h-auto pb-7`}>
      

      <div className="w-full mt-3 h-[50%] p-2">
        <Specialties
          service="medical_services"
          category="Video Consultation"
          setCategories={setCategories} // Pass setCategories to update parent state
        />
      </div>

      {isPopupOpen && <Popup category={'Video Consultation'} items={categories} onClose={closePopup} />}
    </div>
  );
};

export default SpecialtiesCarousel;

