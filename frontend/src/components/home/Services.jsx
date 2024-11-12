import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Popup from "../Popup"; // Adjust the import path as necessary
import Carousel from "../Carousel";

const Services = ({ heading, subHeading, color, service, category }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("http://127.0.0.1:8000/get-category-details", {
          service,
          category,
        });
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };
    fetchData();
  }, [service, category]);

  const handleViewAllClick = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Navigation function for cards
  const handleCardClick = (name) => {
    if(category==='Video Consultation'){
      navigate(`/services/online-video-consultation/consult-doctor/${name}`);
    }
    else if (category==='Pharma Support'){
      navigate(`/services/buy-medicines/products/${name}`);
    }
    else{
      navigate('');
    }
  };

  const Card = ({ item }) => {
    const isActive = window.location.pathname === `/category/${item.id}`;
    const activeStyle = isActive ? "bg-[#1FAB89AD]" : "";

    return (
      <div className="flex justify-center">
        <div
          className={`rounded-2xl h-auto w-full max-w-xs mb-4 overflow-hidden shadow-lg transition-all duration-300 transform cursor-pointer hover:scale-105 ${activeStyle}`}
          onClick={() => handleCardClick(item.name)} // Use navigation
        >
          {/* Image Container */}
          <div className="relative w-full h-40 rounded-t-2xl overflow-hidden">
            <img
              src={`${item.image_path}`}
              alt={item.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Card Content */}
          <div className="p-4">
            <h3 className="text-[#19456B] font-inter font-semibold text-left text-lg sm:text-xl truncate">
              {item.name}
            </h3>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full h-auto ${color ? "bg-[#f3f3f3]" : "bg-[#e2f2ff]"} p-4 pb-7`}>
      <div className="text-center flex flex-col items-center">
        <h2 className="text-[#19456B] font-bold text-3xl lg:text-4xl mt-8">{heading}</h2>
        <img
          src="https://res.cloudinary.com/dicnuc6ox/image/upload/v1730536587/Vector_-_Underline_d2hvce.png"
          alt=""
          className="h-3 md:h-4 pl-10 lg:pl-20 lg:h-4"
        />
        <p className="text-center mt-8 mb-8 text-sm text-gray-500 md:text-lg">{subHeading}</p>
      </div>

      <div className="w-[90%] flex justify-end my-4">
        <button
          onClick={handleViewAllClick}
          className="text-[#1fab89] mb-4 border-2 border-[#1fab89] px-5 py-1 font-medium text-sm"
        >
          VIEW ALL
        </button>
      </div>

      <div className="w-full mt-3 h-[50%] p-2">
        {/* Pass the Card component and handleCardClick function to the Carousel */}
        <Carousel service={service} category={category} categories={categories} CardComponent={Card} />
      </div>

      <div className="w-full lg:px-44 pt-10">
        <hr className="bg-gray-300 h-1 opacity-35" />
      </div>

      {isPopupOpen && <Popup category={category} items={categories} onClose={closePopup} />}
    </div>
  );
};

export default Services;
