import React from 'react';
import slides from '../../../data/BrowseByHealthData';

const BrowseByHealth = () => {
  const Card = ({ slide }) => (
    <div className={`rounded-lg flex justify-start items-center overflow-hidden shadow-lg ${slide.bgColor} p-1 text-center transition-transform duration-300 transform hover:scale-105`}>
      <div className="relative h-12">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-[13px] font-semibold text-gray-800">{slide.title}</h3>
      </div>
    </div>
  );

  return (
    <div className="relative w-full max-w-6xl mx-auto px-6">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {slides.map((slide, index) => (
          <Card key={index} slide={slide} />
        ))}
      </div>
    </div>
  );
};

export default BrowseByHealth;
