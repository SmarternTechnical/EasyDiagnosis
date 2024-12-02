
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const ReviewsCarousel = ({ reviews, rating, patientsCount }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSlidesToShow = () => {
    if (windowWidth >= 1024) return 4; 
    if (windowWidth >= 768) return 2;  
    if (windowWidth >= 600) return 1;  
    return 1;                          
  };

  const slidesToShow = getSlidesToShow();
  const maxIndex = Math.ceil(reviews.length / slidesToShow) - 1;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 > maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? maxIndex : prevIndex - 1));
  };

  const currentSlideStart = currentIndex * slidesToShow;
  const visibleReviews = reviews.slice(currentSlideStart, currentSlideStart + slidesToShow);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-6 mb-6">
      <h2 className="text-blue-900 text-xl font-semibold mb-4">Reviews of Users</h2>

      <div className="flex gap-4 mb-4">
        <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-2">
          <span>Rating</span>
          <div className="flex items-center">
            <Star className="fill-yellow-400 text-yellow-400" size={16} />
            <span className="ml-1">{rating}</span>
          </div>
        </div>
        <div className="bg-white rounded-lg px-4 py-2">
          <span>Patients Treated</span>
          <span className="ml-2 font-semibold">{patientsCount}</span>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-2/3 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>

      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out">
          {visibleReviews.map((review, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-full px-2"
              style={{ width: `${100 / slidesToShow}%` }}
            >
              <div className="bg-white  p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  <span>{review.userName}</span>
                  <div className="flex items-center">
                    <Star className="fill-yellow-400 text-yellow-400" size={16} />
                    <span className="ml-1">{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-2/3 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
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

export default ReviewsCarousel;
