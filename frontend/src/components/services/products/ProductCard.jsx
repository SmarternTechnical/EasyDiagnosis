// import React from "react";
// import { Link } from "react-router-dom";

// const ProductCard = ({
//   key,
//   image,
//   category,
//   name,
//   packSize,
//   mrp,
//   discountedPrice,
//   cashback,
// }) => {
//   return (
//     <div className="relative bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[250px] text-[#19456b]">
//       {/* Product Image */}
//       <Link to={`/products/details/${key}`}>
//         <div className="flex justify-center h-36">
//         {/* {console.log(image)} */}
//           <img src={`/${image}`} alt={name} className=" w-full h-full rounded-t-lg object-cover object-top" />
//         </div>

//         {/* Product Details */}
//         <div className="px-3 py-2 space-y-2 ">
//           {/* Product Name and Pack Size */}
//           <div className="space-y-0.5">
//             <h3 className="text-base font-semibold text-navy-800 line-clamp-2">
//               {name.length>22?name.slice(0,22)+"...":name}
//             </h3>
//             <p className="text-sm text-navy-800">({packSize})</p>
//           </div>

//           {/* Cashback Info */}
//           {cashback && (
//             <div className="flex items-center space-x-1.5 justify-center ">
//               <span className="text-amber-400 font-medium text-sm">
//                 ED Gold
//               </span>
//               <span className="text-amber-400 text-sm">
//                 ₹{cashback} extra cashback
//               </span>
//             </div>
//           )}

//           {/* Price Details */}
//           <div className="flex items-center space-x-2 justify-center">
//             <span className="text-navy-800 text-sm font-bold">MRP</span>
//             <div className="flex items-center space-x-1.5">
//               <span className="text-gray-500 line-through text-sm">₹{mrp.slice(5)}</span>
//               <span className="text-navy-800 text-lg font-bold">
//                 {discountedPrice}
//               </span>
//             </div>
//           </div>
//         </div>
//       </Link>

//       <button className="w-full bg-[#1FAB89] hover:bg-emerald-600 text-white py-2.5 text-sm font-medium rounded-b-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50">
//         ADD TO CART
//       </button>

//       {/* Category Tag */}
//       <div className="absolute top-1 left-2 bg-gray-600 px-2  rounded-full">
//         <p className="text-xs font-light text-white">{category}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({
  key,
  image,
  category,
  name,
  packSize,
  mrp,
  discountedPrice,
  cashback,
  onViewDetails, // Function to handle Add to Cart
}) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[250px] text-[#19456b]">
      {/* Product Image */}
      <Link to={`/products/details/${key}`}>
        <div className="flex justify-center h-36">
          <img src={`/${image}`} alt={name} className=" w-full h-full rounded-t-lg object-cover object-top" />
        </div>

        {/* Product Details */}
        <div className="px-3 py-2 space-y-2 ">
          {/* Product Name and Pack Size */}
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold text-navy-800 line-clamp-2">
              {name.length > 22 ? name.slice(0, 22) + "..." : name}
            </h3>
            <p className="text-sm text-navy-800">({packSize})</p>
          </div>

          {/* Cashback Info */}
          {cashback && (
            <div className="flex items-center space-x-1.5 justify-center ">
              <span className="text-amber-400 font-medium text-sm">
                ED Gold
              </span>
              <span className="text-amber-400 text-sm">
                ₹{cashback} extra cashback
              </span>
            </div>
          )}

          {/* Price Details */}
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
        onClick={onViewDetails} // Call the onViewDetails function (add to cart)
        className="w-full bg-[#1FAB89] hover:bg-emerald-600 text-white py-2.5 text-sm font-medium rounded-b-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50"
      >
        ADD TO CART
      </button>

      {/* Category Tag */}
      <div className="absolute top-1 left-2 bg-gray-600 px-2 rounded-full">
        <p className="text-xs font-light text-white">{category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
