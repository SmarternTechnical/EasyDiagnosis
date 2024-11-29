import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../../Dropdown/Profile/components/utils";

const ProductCard = ({
  keyy,
  image,
  category,
  name,
  packSize,
  mrp,
  discountedPrice,
  cashback,
  productId, // Added productId prop
}) => {
  const encodedLabel = encodeURIComponent(category);

  const handleAddToCart = async () => {
    try {
      const token = getCookie("accessToken");
  
      if (!token) {
        toast.error("No access token found. Please log in.", { position: "top-right" });
        return;
      }
      console.log(productId)
      const response = await axios.post(
        "http://127.0.0.1:8000/add-to-cart/",
        {
          product_id: productId,
          del_one: "0",
          del_full: "0",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        toast.success("Product added to cart!", { position: "top-right" });
      } else {
        throw new Error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart. Please try again.", { position: "top-right" });
    }
  };
  

  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[250px] text-[#19456b]">
      <Link to={`/services/buy-medicines/products/details/${encodedLabel}/${keyy}`}>
        <div className="flex justify-center h-36">
          <img
            src={`/${image}`}
            alt={name}
            className="w-full h-full rounded-t-lg object-cover object-top"
          />
        </div>

        <div className="px-3 py-2 space-y-2 ">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold text-navy-800 line-clamp-2">
              {name.length > 22 ? name.slice(0, 22) + "..." : name}
            </h3>
            <p className="text-sm text-navy-800">({packSize})</p>
          </div>

          {cashback && (
            <div className="flex items-center space-x-1.5 justify-center ">
              <span className="text-amber-400 font-medium text-sm">ED Gold</span>
              <span className="text-amber-400 text-sm">₹{cashback} extra cashback</span>
            </div>
          )}

          <div className="flex items-center space-x-2 justify-center">
            <span className="text-navy-800 text-sm font-bold">MRP</span>
            <div className="flex items-center space-x-1.5">
              <span className="text-gray-500 line-through text-sm">₹{mrp.slice(5)}</span>
              <span className="text-navy-800 text-lg font-bold">
                {discountedPrice}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart} // Use the new handleAddToCart function
        className="w-full bg-[#1FAB89] hover:bg-emerald-600 text-white py-2.5 text-sm font-medium rounded-b-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50"
      >
        ADD TO CART
      </button>

      <div className="absolute top-1 left-2 bg-gray-600 px-2 rounded-full">
        <p className="text-xs font-light text-white">{category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
