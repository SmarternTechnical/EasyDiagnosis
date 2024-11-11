import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import slides from '../../../data/MedicalCarouselData';

const ShopByCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Adjust currentIndex when screen size changes to prevent empty slides
      const slidesToShow = getSlidesToShow();
      const maxIndex = Math.ceil(slides.length / slidesToShow) - 1;
      setCurrentIndex(prev => Math.min(prev, maxIndex));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSlidesToShow = () => {
    if (windowWidth >= 1024) return 6; // Large screens
    if (windowWidth >= 768) return 4;  // Medium screens
    if (windowWidth >= 600) return 3;  // Smaller medium screens
    return 2;                          // Small screens
  };

  const slidesPerView = getSlidesToShow();
  const maxIndex = Math.ceil(slides.length / slidesPerView) - 1;

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === maxIndex ? 0 : prev + 1)); // Wrap to first slide
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1)); // Wrap to last slide
  };

  // Get current slide's cards
  const currentSlideStart = currentIndex * slidesPerView;
  const currentSlideEnd = currentSlideStart + slidesPerView;
  const visibleSlides = slides.slice(currentSlideStart, currentSlideEnd);

  const getGridClass = () => {
    switch (slidesPerView) {
      case 6:
        return 'grid-cols-6';
      case 4:
        return 'grid-cols-4';
      case 3:
        return 'grid-cols-3';
      default:
        return 'grid-cols-2';
    }
  };

  const Card = ({ slide }) => (
    <div className="flex justify-center">
      <div 
        className={`rounded-2xl w-60 mb-2  overflow-hidden  border border-[#1FAB89] 
          transition-transform duration-300 transform  cursor-pointer`}
      >
        <div className="p-4 ">
          <h3 className="text-sm text-[#1FAB89]">{slide.title}</h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full max-w-6xl mx-auto px-6">
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>

      <div className="overflow-hidden">
        <div className="grid gap-4 transition-all duration-500 ease-in-out">
          <div className={`grid gap-4 ${getGridClass()}`}>
            {visibleSlides.map((slide, index) => (
              <Card key={currentSlideStart + index} slide={slide} />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
};

export default ShopByCategory;
