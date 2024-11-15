import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageData from './data/ImagePageData';

const Carousel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const currentSlideIndex = ImageData.findIndex(item => item.route === location.pathname);
    if (currentSlideIndex !== -1) {
      setCurrentIndex(Math.floor(currentSlideIndex / getSlidesToShow()));
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Adjust currentIndex when screen size changes to prevent empty slides
      const slidesToShow = getSlidesToShow();
      const maxIndex = Math.ceil(ImageData.length / slidesToShow) - 1;
      setCurrentIndex(prev => Math.min(prev, maxIndex));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSlidesToShow = () => {
    if (windowWidth >= 1024) return 4; // 4 slides for large screens
    if (windowWidth >= 768) return 3;  // 3 slides for medium screens
    if (windowWidth >= 600) return 2;  // 2 slides for small screens
    return 1;                          // 1 slide for extra small screens
  };

  const slidesPerView = getSlidesToShow();
  const maxIndex = Math.ceil(ImageData.length / slidesPerView) - 1;

  const nextSlide = () => {
    setCurrentIndex(prev => {
      const newIndex = prev + 1;
      // Wrap around to start if we reach the end
      return newIndex > maxIndex ? 0 : newIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex(prev => {
      const newIndex = prev - 1;
      // Wrap around to end if we're at the start
      return newIndex < 0 ? maxIndex : newIndex;
    });
  };

  const handleCardClick = (route) => {
    navigate(route);
  };

  const Card = ({ slide }) => {
    const isActive = location.pathname === slide.route;
    const activeStyle = isActive ? 'bg-[#1FAB89AD] border-2 border-[#1FAB89]' : '';
  
    return (
      <div className="flex justify-center">
        <div
          className={`rounded-2xl border border-[#1FAB89] w-[90%] h-56 mt-2 mb-2 overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 transform cursor-pointer hover:scale-105 ${activeStyle}`}
          onClick={() => handleCardClick(slide.route)}
        >
          {/* Image Container */}
          <div className="relative h-32 flex  justify-center items-center ">
            <img
              src={slide.image}
              alt={slide.heading}
              className="w-40 h-24 md:w-48 md:h-32 pt-2 object-cover rounded-2xl shadow-sm"
            />
          </div>
  
          {/* Text Content */}
          <div className="p-4">
            <h3 className="text-lg md:text-xl text-[#19456B] font-inter font-semibold text-left ">
              {slide.heading}
            </h3>
          </div>
        </div>
      </div>
    );
  };
  

  // Get current slide's cards
  const currentSlideStart = currentIndex * slidesPerView;
  const currentSlideEnd = currentSlideStart + slidesPerView;
  const visibleCards = ImageData.slice(currentSlideStart, currentSlideEnd);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-6">
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>

      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out">
          {visibleCards.map((slide) => (
            <div key={slide.route} className="flex-shrink-0 w-full px-2" style={{ width: `${100 / slidesPerView}%` }}>
              <Card slide={slide} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>

      <div className="flex justify-center mt-2 pt-2 gap-3">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-12 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-teal-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;