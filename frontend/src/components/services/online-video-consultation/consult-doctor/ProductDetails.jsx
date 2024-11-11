import React, { useState, useEffect } from 'react';


const mockProduct = {
    category: "Baby Care",
    image: "https://res.cloudinary.com/dicnuc6ox/image/upload/v1730728493/easy%20diagnose/2c15c8444fb8a121f0990e0f3d324951_ssmxyb.jpg",
    name: "Himalaya Baby Powder 50 g",
    manufacturer: "Himalaya Drug Company",
    price: 450,
    originalPrice: 800,
    cashback: 5,
    sizes: ["50g", "100g", "200g"],
    highlights: [
      "Himalaya Baby Powder contains herbal actives.",
      "It is free from synthetic colors, parabens and phthalates.",
      "It helps in managing the body odor due to excessive sweat."
    ],
    description:
      "Himalaya Baby Powder is good for the babies. It is safe and effective as it has all the natural herbal actives. It helps in managing the body odour caused due to excess sweat. It helps in nourishing, gives protection, moisturizes the skin. It also helps in keeping the baby dry all day and also has astringent and antipersistent properties.",
    ingredients: ["Extracts of Almond oil and Olive Oil", "Khus Grass", "Natural Zinc"],
    usage: "After giving a bath to your baby, gently apply this powder on the areas like face, elbows and knees. It is better not to apply near the area of eyes.",
    storage: "Store at room temperature protected from sunlight, heat, and moisture. Keep it away from the reach to the children and pets. Use this powder before the date of expiry."
  };
  
const ProductDetails= () => {
  const [selectedSize, setSelectedSize] = useState(mockProduct.sizes[0]);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };
 
  return (
    <div className=" mx-auto p-8 flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8 ">
      {/* mockProduct Card */}
      <div className="bg-white shadow-md rounded-lg w-[50%] p-1 lg:w-[20%] h-[5%]">
        <div className="text-sm bg-gray-200 text-gray-700 rounded-full px-3 py-1 mb-2 inline-block">
          {mockProduct.category}
        </div>
        <img src={mockProduct.image} alt={mockProduct.name} className="w-full h-32 object-contain mb-4" />
        <h2 className="text-2xl font-bold text-[#19456b] mb-2">MRP ₹{mockProduct.price} <span className="line-through text-gray-500">₹{mockProduct.originalPrice}</span></h2>
        <p className="text-yellow-500 text-sm mb-4">ED Gold ₹{mockProduct.cashback} extra cashback</p>
        
        <div className="flex space-x-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">PACK SIZE</label>
            <select
              className="border border-gray-300 rounded p-2"
              value={selectedSize}
              onChange={handleSizeChange}
            >
              {mockProduct.sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">UNIT COUNT</label>
            <p className="text-[#19456b] mt-2">{selectedSize} BABY POWDERS</p>
          </div>
        </div>
        <button className="w-full bg-[#1fab89] text-white py-2 rounded ">ADD TO CART</button>
      </div>

      {/* mockProduct Details */}
      <div className="lg:w-2/3 mt-6 lg:mt-0 ">
        <h1 className="text-3xl font-bold text-[#19456b] mb-2">{mockProduct.name}</h1>
        <p className="text-gray-600 mb-6">Manufactured By <span className="text-[#19456b] font-medium">{mockProduct.manufacturer}</span></p>
        <hr className='h-[0.15rem] bg-gray-300 opacity-60 mb-2' />
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-[#19456b] mb-2">Highlights</h3>
          <ul className="list-disc pl-5 text-gray-600">
            {mockProduct.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
        <hr className='h-[0.15rem] bg-gray-300 opacity-60 mb-2' />
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-[#19456b] mb-2">Description</h3>
          <p className="text-gray-600">{mockProduct.description}</p>
        </div>
        <hr className='h-[0.15rem] bg-gray-300 opacity-60 mb-2' />
        
      </div>
    </div>
  );
};

export default ProductDetails;
