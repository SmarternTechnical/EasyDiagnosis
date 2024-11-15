import React, { useState, useEffect } from "react";
import { MapPin, Star } from "lucide-react";

const ProductCard = ({
  image,
  name,
  location,
  rating,
  category,
  specialities
}) => {
  const [lengthMore, setLengthMore] = useState(false);
  const [finalSpec, setFinalSpec] = useState(specialities);
  const [len, setLen] = useState(0); // Use state to store `len`

  useEffect(() => {
    const specArray = specialities.split(", ");
    if (specArray.length > 2) {
      setLengthMore(true);
      setFinalSpec(specArray.slice(0, 1).join(", ") + ", " + specArray[1]);
      setLen(specArray.length - 2); // Update `len` state
    } else {
      setLengthMore(false);
      setFinalSpec(specialities);
      setLen(0); // Set len to 0 when there are no extra items
    }
  }, [specialities]);

  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[250px] font-inter">
      {/* Product Image with BOOKED Tag */}
      <div className="relative flex justify-center">
        <img src={`/${image}`} alt={name} className="w-full h-32 object-cover" />
      </div>

      {/* Product Details */}
      <div className="p-3">
        {/* Product Name, Rating, and Expert */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#19456B] truncate">
            {name.length < 22 ? name : name.slice(0, 22) + "..."}
          </h3>
        </div>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-[#FFD700] mr-1" />
          <span className="text-[#FFD700] text-sm font-semibold mr-2">
            {rating}
          </span>
        </div>
        <div className="w-full text-sm py-2">
          <p>{lengthMore ? finalSpec + ` and ${len} more` : specialities}</p>
        </div>
        {location && (
          <div className="flex items-center mt-1">
            <MapPin className="w-3 h-3 text-gray-600 mr-1" />
            <span className="text-[#5D5D5D] text-xs">{location}</span>
          </div>
        )}
        <div className="text-xs absolute top-2 left-1 text-white bg-gray-500 px-1 py-1 rounded-full">
          {category}
        </div>
      </div>

      <button className="w-full bg-[#FFD43C] text-white py-2 text-sm font-medium rounded-b-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50">
        VIEW DETAILS
      </button>
    </div>
  );
};

export default ProductCard;
