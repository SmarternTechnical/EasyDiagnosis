
// import React, { useState, useMemo } from 'react';

// const ProductDetails = ({
//   name,
//   category,
//   product_image, 
//   actual_product_price, 
//   discounted_price,
//   description 
// }) => {
//   const [selectedSize, setSelectedSize] = useState('');
//   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

//   const truncateDescription = (text) => {
//     if (text == null) return '';
//     const safeText = String(text);
//     if (safeText.length <= 500) return safeText;
//     return safeText.substring(0, 500) + '...';
//   };

//   const toggleDescription = () => {
//     setIsDescriptionExpanded(!isDescriptionExpanded);
//   };

//   const handleSizeChange = (event) => {
//     setSelectedSize(event.target.value);
//   };


//   const displayDescription = isDescriptionExpanded 
//     ? description 
//     : truncateDescription(description);

 
//   const shouldShowReadMoreButton = description 
//     ? String(description).length > 500 
//     : false;

//   return (
//     <div className="mx-auto p-8 flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8">
//       {/* Product Card */}
//       <div className="relative bg-white shadow-md rounded-2xl w-[50%] lg:w-[20%] h-[5%]">
//         <div className="absolute top-2 left-2 text-sm bg-gray-200 text-gray-700 rounded-full px-3 py-1">
//           {category}
//         </div>
//         <img
//           src={`/${product_image}`}
//           alt={name}
//           className="w-full h-44 rounded-t-2xl mb-4"
//         />

//         <h2 className="text-xl font-bold text-[#4d7393] mb-2 m-2">
//           MRP ₹{discounted_price}{" "}
//           <span className="line-through text-gray-500">
//             ₹{actual_product_price}
//           </span>
//         </h2>
//         <p className="text-yellow-500 text-sm mb-4 m-2">
//           ED Gold ₹5 extra cashback
//         </p>

//         <div className="flex space-x-4 mb-4 m-2">
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               PACK SIZE
//             </label>
//             <select
//               className="border border-gray-300 rounded p-2 w-full"
//               value={selectedSize}
//               onChange={handleSizeChange}
//             >
//               <option value="">Select Size</option>
//               <option value="50g">50g</option>
//               <option value="100g">100g</option>
//               <option value="200g">200g</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               UNIT COUNT
//             </label>
//             <p className="text-[#19456b] mt-2">{selectedSize || 'N/A'}</p>
//           </div>
//         </div>
//         <button className="w-full bg-[#1fab89] text-white py-2 rounded-b-2xl px-2">
//           ADD TO CART
//         </button>
//       </div>

//       {/* Product Details */}
//       <div className="lg:w-2/3 mt-6 lg:mt-0">
//         <h1 className="text-3xl font-bold text-[#19456b] mb-2">
//           {name}
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Manufactured By{" "}
//           <span className="text-[#19456b] font-medium">
//             Himalaya Drug Company
//           </span>
//         </p>
//         <hr className="h-[0.15rem] bg-gray-300 opacity-60 mb-2" />
        
//         {/* Description Section with Read More */}
//         <div className="mb-4">
//           <h3 className="text-xl font-semibold text-[#19456b] mb-2">
//             Description
//           </h3>
//           <p className="text-gray-600">
//             {displayDescription}
//           </p>
          
//           {shouldShowReadMoreButton && (
//             <button 
//               onClick={toggleDescription} 
//               className="text-[#1fab89] font-semibold mt-2 hover:underline focus:outline-none"
//             >
//               {isDescriptionExpanded ? 'Read Less' : 'Read More'}
//             </button>
//           )}
//         </div>
//         <hr className="h-[0.15rem] bg-gray-300 opacity-60 mb-2" />
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useState } from 'react';

const ProductDetails = ({
  name,
  category,
  product_image, 
  actual_product_price, 
  discounted_price,
  description 
}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const truncateDescription = (text) => {
    if (text == null) return '';
    const safeText = String(text);
    if (safeText.length <= 500) return safeText;
    return safeText.substring(0, 500) + '...';
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const displayDescription = isDescriptionExpanded 
    ? description 
    : truncateDescription(description);

  const shouldShowReadMoreButton = description 
    ? String(description).length > 500 
    : false;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image and Details Card */}
        <div className="w-full md:w-1/2 lg:w-1/3">
          <div className="bg-white shadow-md rounded-2xl overflow-hidden">
            {/* Category Badge */}
            <div className="relative">
              <div className="absolute top-2 left-2 text-sm bg-gray-200 text-gray-700 rounded-full px-3 py-1 z-10">
                {category}
              </div>
              
              {/* Product Image */}
              <img
                src={`/${product_image}`}
                alt={name}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Pricing */}
            <div className="p-4">
              <h2 className="text-xl font-bold text-[#4d7393] mb-2">
                MRP ₹{discounted_price}{" "}
                <span className="line-through text-gray-500 text-base">
                  ₹{actual_product_price}
                </span>
              </h2>
              <p className="text-yellow-500 text-sm mb-4">
                ED Gold ₹5 extra cashback
              </p>

              {/* Size and Unit Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    PACK SIZE
                  </label>
                  <select
                    className="border border-gray-300 rounded p-2 w-full"
                    value={selectedSize}
                    onChange={handleSizeChange}
                  >
                    <option value="">Select Size</option>
                    <option value="50g">50g</option>
                    <option value="100g">100g</option>
                    <option value="200g">200g</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    UNIT COUNT
                  </label>
                  <p className="text-[#19456b] mt-2">{selectedSize || 'N/A'}</p>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-[#1fab89] text-white py-2 mt-4 rounded-b-2xl">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>

        {/* Product Text Details */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <h1 className="text-2xl md:text-3xl font-bold text-[#19456b] mb-2">
            {name}
          </h1>
          <p className="text-gray-600 mb-4">
            Manufactured By{" "}
            <span className="text-[#19456b] font-medium">
              Himalaya Drug Company
            </span>
          </p>
          
          <hr className="h-[0.15rem] bg-gray-300 opacity-60 mb-4" />
          
          {/* Description Section */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-[#19456b] mb-2">
              Description
            </h3>
            <p className="text-gray-600 mb-2">
              {displayDescription}
            </p>
            
            {shouldShowReadMoreButton && (
              <button 
                onClick={toggleDescription} 
                className="text-[#1fab89] font-semibold hover:underline focus:outline-none"
              >
                {isDescriptionExpanded ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>
          
          <hr className="h-[0.15rem] bg-gray-300 opacity-60" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;