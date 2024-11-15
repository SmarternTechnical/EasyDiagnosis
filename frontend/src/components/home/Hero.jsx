import React from 'react';
import img from '../../assets/hero-section-image.png'

const Hero = () => {
  return (
    <div className="w-full h-auto lg:h-[80vh] mt-16 lg:mt-2">
      <div className="container mx-auto px-4 lg:px-0 py-3 h-full flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-28">
        <div className="w-full lg:w-1/2 p-2 flex flex-col gap-4 lg:ml-16">
          <p className="text-center lg:text-left text-[#1fab89] font-medium text-lg lg:text-xl">
            WELCOME TO EASY DIAGNOSIS
          </p>
          <h1 className="text-3xl lg:text-5xl text-center lg:text-left font-nunito font-thin text-blue-900">
            Everyone deserves a better way of Living
          </h1>
          <div className="flex items-center justify-center lg:justify-start sm:mt-4">
            <div className="flex items-center bg-white border rounded-full shadow-md sm:px-4 sm:py-2 sm:w-full sm:max-w-lg">
              <select className="bg-transparent text-gray-600 focus:outline-none">
                <option>Delhi</option>
                <option>Mumbai</option>
                <option>Bangalore</option>
                <option>Chennai</option>
              </select>
              <input
                type="text"
                placeholder="Search for doctors, medicines, hospitals, etc."
                className="flex-grow px-4 py-2 text-gray-600 bg-transparent focus:outline-none"
              />
              <button className="bg-[#1fab89] text-white text-sm p-1 mr-1 sm:px-4 sm:py-2 rounded-full">
                Search
              </button>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex items-center justify-center lg:justify-start gap-4 mt-6">
            <button className="bg-[#1fab89] text-white p-1 sm:px-6 sm:py-3 rounded-full font-medium hover:bg-teal-800 transition">
              BOOK AN APPOINTMENT
            </button>
            <button className="border border-[#1fab89] text-[#1fab89] text-sm p-1 sm:px-6 sm:py-3 rounded-full font-medium hover:bg-green-100 transition">
              LEARN MORE
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 relative flex justify-center">
          <img
            src={img}
            alt="Doctor consultation"
            className="w-full max-w-lg h-auto object-cover rounded-md lg:max-w-none" // Adjust max-w-lg to fit better on smaller screens
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
