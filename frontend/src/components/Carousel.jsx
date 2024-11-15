import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Carousel = ({ categories = [], CardComponent,service, category }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Adjust currentIndex based on window resizing
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      const slidesToShow = getSlidesToShow();
      const maxIndex = Math.ceil(categories.length / slidesToShow) - 1;
      setCurrentIndex((prev) => Math.min(prev, maxIndex)); // Prevent index out of bounds
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, [categories.length]);

  const getSlidesToShow = () => {
    if (windowWidth >= 1024) return 4; // Show 4 items on large screens
    if (windowWidth >= 768) return 3; // Medium screens
    if (windowWidth >= 600) return 2;
    return 1; // Show 1 item on small screens
  };

  const slidesPerView = getSlidesToShow();
  const maxIndex = Math.ceil(categories.length / slidesPerView) - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      return newIndex > maxIndex ? 0 : newIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      return newIndex < 0 ? maxIndex : newIndex;
    });
  };

  const handleCardClick = (route) => {
    navigate(route);
  };

  // Card component for individual items
  const Card = CardComponent
  

  const currentSlideStart = currentIndex * slidesPerView;
  const currentSlideEnd = currentSlideStart + slidesPerView;
  const visibleSlides = categories.slice(currentSlideStart, currentSlideEnd);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-6">
      {/* Previous Slide Button */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-[45%] transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>

      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out">
          {visibleSlides.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-full px-2"
              style={{ width: `${100 / slidesPerView}%` }}
            >
              <Card item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Next Slide Button */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-[45%] transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>

      {/* Pagination */}
      <div className="flex justify-center mt-2 pt-2 gap-3">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-12 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-teal-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
