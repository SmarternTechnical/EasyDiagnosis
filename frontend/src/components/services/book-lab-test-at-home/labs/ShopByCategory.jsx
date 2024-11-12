import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ShopByCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/get-category-details",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              service: "medical_services",
              category: "Book Lab Tests",
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      const slidesToShow = getSlidesToShow();
      const maxIndex = Math.ceil(categories.length / slidesToShow) - 1;
      setCurrentIndex((prev) => Math.min(prev, maxIndex));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [categories.length]);

  const getSlidesToShow = () => {
    if (windowWidth >= 1024) return 6;
    if (windowWidth >= 768) return 4;
    if (windowWidth >= 600) return 3;
    return 2;
  };

  const slidesPerView = getSlidesToShow();
  const maxIndex = Math.ceil(categories.length / slidesPerView) - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const currentSlideStart = currentIndex * slidesPerView;
  const currentSlideEnd = currentSlideStart + slidesPerView;
  const visibleSlides = categories.slice(currentSlideStart, currentSlideEnd);

  const getGridClass = () => {
    switch (slidesPerView) {
      case 6:
        return "grid-cols-6";
      case 4:
        return "grid-cols-4";
      case 3:
        return "grid-cols-3";
      default:
        return "grid-cols-2";
    }
  };

  const Card = ({ category }) => (
    <div className="flex justify-center">
      <div className="rounded-2xl w-60 mb-2 overflow-hidden border border-[#1FAB89] transition-transform duration-300 transform cursor-pointer">
        <div className="p-4">
          <h3 className="text-sm text-[#1FAB89] truncate">{category.name}</h3>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="w-full flex justify-center p-8">
        <div className="animate-pulse bg-gray-200 rounded-lg w-full max-w-6xl h-32"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center p-8">
        <div className="text-red-500">Error loading categories: {error}</div>
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="w-full flex justify-center p-8">
        <div className="text-gray-500">No categories available</div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto px-6">
      {maxIndex > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
      )}
      <div className="overflow-hidden">
        <div className="grid gap-4 transition-all duration-500 ease-in-out">
          <div className={`grid gap-4 ${getGridClass()}`}>
            {visibleSlides.map((category) => (
              <Card key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
      {maxIndex > 0 && (
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default ShopByCategory;
