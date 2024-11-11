import React from "react";
import { MapPin, Star, Bookmark } from "lucide-react";
import Ling from "../../../../assets/ri_speak-line.png";

const ProductCard = ({
  keyy,
  image,
  label,
  name,
  expert,
  price,
  qualification,
  location,
  language,
  experience,
  rating
}) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[280px] font-inter">
      {/* Product Image with BOOKED Tag */}
      <div className="relative flex justify-center">
        <img src={`/${image}`} alt={name} className="w-full h-32 object-cover" />

        {/* Label */}
        <div className="absolute top-2 left-2 bg-[#5D5D5D] text-white text-[10px] px-2 py-1 rounded-full">
          {label}
        </div>

        {/* Bookmark Icon inside Circle */}
        <div className="absolute top-2 right-2 bg-[#5D5D5D] rounded-full p-1">
          <Bookmark className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3">
        {/* Product Name, Rating, and Expert */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl text-[#19456B]">{name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-[#FFD700] mr-1" />
            <span className="text-[#FFD700] text-sm font-semibold mr-2">
              {rating}
            </span>
          </div>
        </div>
        <p className="text-base text-[#1FAB89]">EXPERT: {expert}</p>

        {/* Qualification Info */}
        {qualification && (
          <div className="flex items-center mt-1">
            <span className="text-[#5D5D5D] text-xs">Qualifications:</span>
            <span className="ml-1 text-[#5D5D5D] text-xs">{qualification}</span>
          </div>
        )}

        {/* Location Info */}
        {location && (
          <div className="flex items-center mt-1">
            <MapPin className="w-3 h-3 text-gray-600 mr-1" />
            <span className="text-[#5D5D5D] text-xs">{location}</span>
          </div>
        )}

        {/* Price Details */}
        <div className="flex items-center space-x-2 font-semibold mt-1">
          <span className="text-[#1FAB89] text-base">STARTS AT</span>
          <span className="text-[#1FAB89] text-base">₹{price}</span>
        </div>

        {/* Language Info */}
        {language && (
          <div className="flex items-center mt-1">
            <img
              src={Ling}
              alt="Language"
              className="w-3 h-3 text-gray-600 mr-1"
            />
            <span className="text-[#5D5D5D] text-xs">{language}</span>
          </div>
        )}

        {/* Experience Info */}
        {experience && (
          <div className="flex items-center mt-1">
            <span className="text-[#5D5D5D] text-xs">
              {experience} years of experience
            </span>
          </div>
        )}
      </div>

      <button className="w-full bg-[#FFD43C] text-white py-2 text-sm font-medium rounded-b-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50">
        VIEW DETAILS
      </button>
    </div>
  );
};

export default ProductCard;
