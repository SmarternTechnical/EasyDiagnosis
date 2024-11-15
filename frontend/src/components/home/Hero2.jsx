import React from 'react';
import { Link } from 'react-router-dom';
import ImageData from '../data/ImagePageData.js';

const Hero2 = () => {
  return (
    <div className="flex flex-col items-center p-5 text-center bg-[#f3f3f3] font-inter pb-7">
      <div className="text-container flex flex-col items-center flex-wrap pt-1 gap-2">
        <h3 className="mt-5 text-[#69696a] mb-2 font-medium text-xl md:text-xl transform scale-105">
          What are you <span className="text-[#1bad89]">looking for?</span>
        </h3>
        <div>
          <h1 className="text-[#184e62] font-semibold text-xl mb-2 md:text-4xl font-poppins">
            Our Healthcare Services
          </h1>
          <img
            src="https://res.cloudinary.com/dicnuc6ox/image/upload/v1730536587/Vector_-_Underline_d2hvce.png"
            alt=""
            className="h-3 md:h-4 pl-10 lg:pl-20 lg:h-4"
          />
        </div>
        <p className="text-center text-sm mt-4 text-gray-500 md:text-lg">
          Easy Diagnosis offers a comprehensive suite of healthcare services to keep you feeling your best.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-11/12 lg:w-[70%] mt-8 px-4 md:px-0">
          {ImageData.map((item, index) => (
            <Link
              key={index}
              to={item.route}
              className="bg-white border border-[#04c897] rounded-2xl shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 flex flex-col items-center p-5"
            >
              <img
                src={item.image}
                alt={item.heading}
                className="w-full h-32 md:h-36 lg:h-40 object-cover rounded-2xl mb-3"
              />
              <h3 className="text-[#19456B] text-base font-semibold w-full text-left">{item.heading}</h3>
              <p className="text-gray-500 text-xs leading-5 mt-2 pt-1 pl-1 w-full text-left">{item.paragraph}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full lg:px-44 pt-10">
        <hr className="bg-gray-300 h-1 opacity-40" />
      </div>
    </div>
  );
};

export default Hero2;
