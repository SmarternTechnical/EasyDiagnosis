import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import slides from '../../../data/DiscountCarouselData.js';

const DiscountCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      const slidesToShow = getSlidesToShow();
      const maxIndex = Math.ceil(slides.length / slidesToShow) - 1;
      setCurrentIndex(prev => Math.min(prev, maxIndex));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSlidesToShow = () => {
    if (windowWidth >= 1024) return 4;
    if (windowWidth >= 768) return 2;
    return 1;
  };

  const slidesPerView = getSlidesToShow();
  const maxIndex = Math.max(0, Math.ceil(slides.length / slidesPerView) - 1);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  const currentSlideStart = currentIndex * slidesPerView;
  const currentSlideEnd = currentSlideStart + slidesPerView;
  const visibleSlides = slides.slice(currentSlideStart, currentSlideEnd);

  const Card = ({ slide }) => (
    <div className="w-full flex justify-center">
      <div className="relative w-64 h-20 rounded-2xl border border-gray-300 flex gap-2 p-4 hover:shadow-md transition-shadow duration-300">
        <img src={slide.image} alt="Discount" className="w-auto h-12" />
        <div className="flex flex-col justify-between ml-4">
          <p className="text-[12px] font-medium text-[#5D5D5D] leading-tight">
            {slide.description}
          </p>
          <div className="flex items-center gap-1 text-[#5D5D5D]">
            <span className="text-[8px] font-medium">CODE:</span>
            <span className="text-[8px] font-bold">{slide.code}</span>
          </div>
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
          <div 
            className={`grid gap-4 ${
              slidesPerView === 4 ? 'grid-cols-4' : 
              slidesPerView === 2 ? 'grid-cols-2' : 
              'grid-cols-1'
            }`}
          >
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

      <div className="flex justify-center mt-4 gap-3">
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

export default DiscountCarousel;
