import React from "react";
import { Search, MapPin } from "lucide-react";

const SearchSection = ({ heading, cityOptions, subheading }) => {
  return (
    <div>
      <h1 className="font-inter text-4xl font-bold tracking-tight text-center text-[#19456B] w-full mt-4 mb-4">
        {heading}
      </h1>
      <h4 className="font-inter text-xl font-bold tracking-tight text-center text-[#5D5D5D] w-full mt-4 mb-4">
        {subheading}
      </h4>
      <div className="w-full p-4">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2 rounded-lg ">
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Location Icon and Select Dropdown */}
                <div className="relative bg-white rounded-lg sm:w-1/4">
                  <div className="absolute left-3 top-4 text-gray-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <select className="w-full p-3 pl-10 pr-12 rounded-full appearance-none border">
                    {cityOptions.map((city, index) => (
                      <option key={index}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Search Input */}
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for medicines, health care products, labs and more"
                    className="w-full p-3 pr-16 rounded-full border border-gray-300 focus:outline-none"
                  />
                  <button className="absolute right-[6px] top-[6px] h-3/4 px-4 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors flex items-center justify-center">
                    <Search className="w-5 h-5 mr-2" />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="space-x-4 flex justify-center">
              {/* Filters Button */}
              <div className="flex items-center">
                <button className=" bg-white rounded-lg p-1 pl-4 pr-4 border-black border shadow hover:shadow-md transition-shadow flex items-center justify-between">
                  <span className="text-gray-700 text-xl">Filters</span>
                </button>
              </div>
              {/* Sort by: Relevance Button */}
              <div className="flex items-center">
                <button className=" bg-white rounded-lg p-1 pl-4 pr-4 border-black border shadow hover:shadow-md transition-shadow flex items-center justify-between">
                  <span className="text-gray-700 text-xl">
                    Sort by: Relevance
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
