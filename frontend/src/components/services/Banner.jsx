import React from 'react';

const Banner = ({ heading, subheading, description, image }) => {
  return (
    <div className="bg-[#E2F2FF] flex flex-col lg:flex-row items-center justify-around w-full mx-auto p-6">
      {/* Left Side Content */}
      <div className="flex flex-col space-y-2 lg:w-2/5">
        <h3 className="font-inter text-lg font-semibold leading-[26.63px] text-left text-[#19456BAB]">{heading}</h3>
        <h1 className="font-baloo-bhaijaan text-[50px] text-left text-[#19456B]">{subheading}</h1>
        <h3 className="font-inter text-[18px] text-left text-[#5D5D5D]">{description}</h3>
      </div>

      {/* Right Side Image */}
      <div className="lg:w-auto mt-4 lg:mt-0">
        <img src={image} alt="Delivery Service" className="w-auto h-[300px] rounded-lg" />
      </div>
    </div>
  );
};

export default Banner;
