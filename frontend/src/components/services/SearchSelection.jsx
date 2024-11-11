import React from 'react';
import { Search, CheckCircle, FileText, FileX } from 'lucide-react';

const SearchSelection = ({ heading, subheading, cityOptions, button1Text, button2Text, features }) => {
  return (
    <div>
      <h1 className="font-inter text-4xl font-bold tracking-tight text-center text-[#19456B] w-full mt-4 mb-4">
        {heading}
      </h1>

      <div className="w-full p-4">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2 bg-[#1FAB89] rounded-lg p-6 mb-4 lg:mb-0">
              <div className="flex flex-wrap gap-4 mb-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center text-white">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-white text-xl mb-4">
                {subheading}
              </h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative bg-white rounded-lg sm:w-1/4">
                  <select className="w-full p-3 appearance-none bg-transparent">
                    {cityOptions.map((city, index) => (
                      <option key={index}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="relative w-full ">
                  <input
                    type="text"
                    placeholder="Search for medicines, health care products and more"
                    className="w-full p-3 pr-16 rounded-lg focus:outline-none"
                  />
                  <button className="absolute right-0 top-0 h-full px-4 bg-emerald-600 text-white rounded-r-lg hover:bg-emerald-700 transition-colors flex items-center justify-center">
                      <Search className="w-5 h-5 mr-2" />
                      <span>Search</span>
                    </button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <button className="w-full bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-emerald-100 rounded-full mr-3">
                    <FileText className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="text-gray-700">{button1Text}</span>
                </div>
                <span className="text-emerald-600">&gt;</span>
              </button>
              <button className="w-full bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-full mr-3">
                    <FileX className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-gray-700">{button2Text}</span>
                </div>
                <span className="text-emerald-600">&gt;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSelection;
