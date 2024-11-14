import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from 'axios';
import Carousel from "../../../Carousel";
import Popup from "../../../Popup"; // Adjust the import path if necessary

const Specialties = ({ service, category }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('http://127.0.0.1:8000/get-category-details', {
          service,
          category,
        });
        setCategories(res.data);
        console.log("Fetched categories:", res.data); // Debugging log for fetched categories
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

  // Define handleCardClick for navigation
  const handleCardClick = (path) => {
    navigate(path); // Programmatically navigate to the desired route
  };

  const Card = ({ item }) => {
    const isActive = window.location.pathname === `/category/${item.id}`;
    const activeStyle = isActive ? "bg-[#1FAB89AD]" : "";

    return (
      <div className="flex justify-center">
        <div
          className={`rounded-2xl h-auto w-full max-w-xs mb-4 overflow-hidden shadow-lg transition-all duration-300 transform cursor-pointer hover:scale-105 ${activeStyle}`}
          onClick={() => handleCardClick(`/services/online-video-consultation/consult-doctor/${item.name}`)} // Use navigation function
        >
          {/* Image Container */}
          <div className="relative w-full h-40 rounded-t-2xl overflow-hidden">
            <img
              src={`/${item.image_path}`} // Ensure the path resolves correctly
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
      {/* Header with View All Button */}
      <div className="w-full h-auto flex justify-between items-center mt-10">
        <div className="font-inter text-[35px] font-bold tracking-tight text-left text-[#19456B]">
          Specialties
        </div>
        <button
          onClick={handleViewAllClick}
          className="text-[#1FAB89] border-2 border-[#1FAB89] px-5 py-2 font-medium text-sm rounded-lg hover:bg-[#1FAB89] hover:text-white transition-all duration-300 ease-in-out"
        >
          VIEW ALL
        </button>
      </div>

      {/* Carousel Section */}
      <div className="w-full mt-3 h-[50%] p-2">
        <Carousel service={service} category={category} categories={categories} CardComponent={Card} />
      </div>

      {/* Popup for View All */}
      {isPopupOpen && <Popup category={category} items={categories} onClose={closePopup} />}
    </div>
  );
};

export default Specialties;
