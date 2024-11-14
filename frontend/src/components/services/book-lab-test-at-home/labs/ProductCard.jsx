import React from "react";
import { useState , useEffect } from "react";
import { MapPin, Bookmark } from "lucide-react";

const ProductCard = ({
  l_name,
  category,
  l_image,
  location,
  specialties,
}) => {
  const [lengthMore, setLengthMore] = useState(false);
  const [finalSpec, setFinalSpec] = useState(specialties);
  const [len, setLen] = useState(0);
  useEffect(() => {
    const specArray = specialties.split(", ");
    if (specArray.length > 2) {
      setLengthMore(true);
      setFinalSpec(specArray.slice(0, 1).join(", ") + ", " + specArray[1]);
      setLen(specArray.length - 2);
    } else {
      setLengthMore(false);
      setFinalSpec(specialties);
      setLen(0);
    }
  }, [specialties]);
  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[280px] font-inter">
      {/* Product Image with BOOKED Tag */}
      <div className="relative flex justify-center">
        <img
          src={`/${l_image}`}
          alt={l_name}
          className="w-full h-32 object-cover"
        />
        {/* Label */}
        <div className="absolute top-2 left-2 bg-[#5D5D5D] text-white text-[10px] px-2 py-1 rounded-full">
          {category}
        </div>

        {/* Bookmark Icon inside Circle */}
        <div className="absolute top-2 right-2 bg-[#5D5D5D] rounded-full p-1">
          <Bookmark className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3">
        {/* Product Name and Category */}
        <div className="flex flex-col">
          <h3 className="text-xl text-[#19456B] truncate">{l_name}</h3>
          <div className="w-full text-sm py-2">
            <p>{lengthMore ? finalSpec + ` and ${len} more` : specialties}</p>
          </div>
        </div>

        {/* Location Info */}
        {location && (
          <div className="flex items-center mt-1">
            <MapPin className="w-3 h-3 text-gray-600 mr-1" />
            <span className="text-[#5D5D5D] text-xs">{location}</span>
          </div>
        )}
      </div>

      {/* Button to View Details */}
      <button className="w-full bg-[#FFD43C] text-white py-2 text-sm font-medium rounded-b-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50">
        VIEW DETAILS
      </button>
    </div>
  );
};

export default ProductCard;
