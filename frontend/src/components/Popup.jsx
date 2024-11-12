import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Search } from 'lucide-react';

const Popup = ({ category,items, onClose }) => {
  if (!Array.isArray(items)) {
    console.error('Expected items to be an array, but received:', items);
    return null;
  }
  console.log(category);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const navigate = useNavigate(); // Initialize navigate function

  // Filter items based on search query
  useEffect(() => {
    if (searchQuery) {
      setFilteredItems(
        items.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredItems(items);
    }
  }, [searchQuery, items]);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains('popup')) {
      onClose();
    }
  };

  // Handle click on an item
  const handleItemClick = (name) => {
    if(category==='Video Consultation'){
      navigate(`/services/online-video-consultation/consult-doctor/${name}`);
    }
    else if (category==='Pharma Support'){
      navigate(`/services/buy-medicines/products/${name}`);
    }
    else{
      navigate('');
    }
    onClose(); // Close the popup
  };

  return (
    <div
      className="popup fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOutsideClick} 
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-4xl w-full h-4/5 overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          style={{ fontWeight: 'bold', background: 'transparent', border: 'none' }} 
        >
          X
        </button>
        
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="font-inter text-3xl font-semibold text-[#19456B]">Choose Specialty</h2>
        </div>

        {/* Search Bar */}
        <div className="relative w-full mb-6">
          <input
            type="text"
            placeholder="Search for specialties"
            className="w-full p-3 pr-16 rounded-full border border-gray-300 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-[6px] top-[6px] h-3/4 px-4 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors flex items-center justify-center">
            <Search className="w-5 h-5 mr-2" />
            <span>Search</span>
          </button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <div
              key={`/category/${item.id}`}
              className="border shadow-md shadow-[#0000004D] rounded-2xl flex flex-col items-center cursor-pointer"
              onClick={() => handleItemClick(item.name)}// Navigate on click
            >
              <img
                src={`/${item.image_path}`} 
                alt={item.name}
                className="w-full h-3/4 rounded-t-2xl mb-2"
                style={{ maxHeight: '150px'}}
              />
              <h3 className="text-l w-full pl-2 text-left text-[#19456B] font-semibold">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
