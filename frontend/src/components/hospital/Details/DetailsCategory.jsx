import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShopByCategory = ({ category, service, id }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(calculateSlidesPerView());
  let namee = category.name;

  // Calculate slides per view based on window width
  function calculateSlidesPerView() {
    const width = window.innerWidth;
    if (width >= 1024) return 6;
    if (width >= 768) return 4;
    if (width >= 600) return 3;
    return 2;
  }

  useEffect(() => {
    // Fetch categories
    const fetchData = async () => {
      try {
        const res = await axios.post("http://127.0.0.1:8000/get-category-details", {
          service,
          category,
        });
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };
    fetchData();

    // Handle window resize
    const handleResize = () => {
      setSlidesPerView(calculateSlidesPerView());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [service, category]);

  // Calculate max index for carousel
  const maxIndex = Math.ceil(categories.length / slidesPerView) - 1;

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  // Determine visible categories
  const visibleCategories = categories.slice(
    currentIndex * slidesPerView, 
    (currentIndex + 1) * slidesPerView
  );

  const Card = ({ categoryy }) => {
    // Check if the category name matches the id prop
    const isActive = 
      id && 
      (categoryy.name.toLowerCase().replace(/\s+/g, '-') === 
       id.toLowerCase().replace(/\s+/g, '-'));

    // Corrected onClick handler with page reload
    const handleOnClick = () => {      
      // Navigate and reload the page
      navigate(`/hospital/details/${categoryy.name}`, {
        state: { 
          categoryDetails: categoryy,
          service: service 
        }
      });

      // Reload the page
      window.location.reload();
    };

    return (
      <div 
        className="flex justify-center" 
        onClick={handleOnClick}
      >
        <div 
          className={`
            rounded-2xl w-60 mb-2 overflow-hidden border 
            transition-all duration-300 transform cursor-pointer
            ${isActive 
              ? 'bg-[#1FAB89] text-white border-[#1FAB89]' 
              : 'border-[#1FAB89] text-[#1FAB89] hover:bg-[#1FAB89]/10'
            }
          `}
        >
          <div className="p-4">
            <h3 className={`text-sm truncate ${isActive ? 'text-white' : 'text-[#1FAB89]'}`}>
              {categoryy.name}
            </h3>
          </div>
        </div>
      </div>
    );
  };

  // Only show navigation if more items exist than can be shown
  const showNavigation = categories.length > slidesPerView;

  return (
    <div className="relative w-full max-w-6xl mx-auto px-6">
      {showNavigation && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {visibleCategories.map((category, index) => (
          <Card key={index} categoryy={category} />
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;