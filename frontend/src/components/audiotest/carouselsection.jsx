import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Carousel from "../Carousel";

const CarouselSection = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Static data for categories
  const categories = [
    {
      name: "autism",
      image_path: "/images/cancer.png",
    },
    {
      name: "alziemer",
      image_path: "/images/Doctor1.png",
    },
  ];

  // Define handleCardClick for navigation
  const handleCardClick = (path) => {
    navigate(path); // Programmatically navigate to the desired route
  };

  const Card = ({ item }) => {
    const isActive = window.location.pathname === `/audiotest/${item.name}`;
    const activeStyle = isActive ? "bg-[#1FAB89AD]" : "";

    return (
      <div className="flex justify-center">
        <div
          className={`rounded-2xl h-auto w-full max-w-xs mb-4 overflow-hidden shadow-lg transition-all duration-300 transform cursor-pointer hover:scale-105 ${activeStyle}`}
          onClick={() => handleCardClick(`/audiotest/${item.name}`)} // Use navigation function
        >
          {/* Image Container */}
          <div className="relative w-full h-40 rounded-t-2xl overflow-hidden">
            <img
              src={item.image_path} // Ensure the path resolves correctly
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
    <div className={`w-full h-auto bg-[#f3f3f3] p-4 pb-7`}>
      {/* Carousel Section */}
      <div className="w-full mt-3 h-[50%] p-2">
        <Carousel categories={categories} CardComponent={Card} />
      </div>
    </div>
  );
};

export default CarouselSection;
