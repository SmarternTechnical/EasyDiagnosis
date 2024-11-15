
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

const ProductFilter = () => {
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const [conditionExpanded, setConditionExpanded] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false); 

  const categories = [
    'Medicines',
    'Health Care Devices',
    'Mother & Baby Care',
    'Skin Care',
    'Vitamins & Supplements',
    'Hair Care',
    'Ayurveda',
    'Sexual Wellness'
  ];

  const healthConditions = [
    'Diabetes Care',
    'Cold & Immunity',
    'Pain Relief',
    'Sexual Health',
    'Metabolic Care',
    'Cancer Care',
    'Stomach Care',
    'Maternity Care',
    'Infections',
    'Wounds & Injuries',
    'Elderly Care',
    'Vision Care'
  ];

  return (
    <div className="mt-10 w-full lg:max-w-xs px-4 h-auto bg-[#dfdfdf] rounded-lg shadow-sm p-4">
      <div className="lg:hidden w-full flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-700">Filter By</h2>
        <button
          onClick={() => setFilterVisible(!filterVisible)}
          className="text-white flex items-center gap-2 px-4 py-2 bg-green-500  rounded-lg hover:bg-green-600 transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span>{filterVisible ? "Hide" : "Show"} Filters</span>
        </button>
      </div>

      {/* Toggleable filter content on small screens */}
      {(filterVisible || !filterVisible) && (
        <div className={`mt-4 ${filterVisible ? "block" : "hidden lg:block"}`}>
          <div className="h-auto flex flex-row justify-evenly lg:flex-col">
            <h2 className=" hidden  lg:block lg:text-xl lg:font-medium lg:text-gray-700 pb-3 lg:text-center">
              Filter By
            </h2>
            <hr className="hidden lg:block h-[0.1rem] bg-gray-600" />
            {/* Categories Section */}
            <div className="mb-6">
              <button
                className="w-full flex justify-between items-center mb-3 text-gray-700 font-medium"
                onClick={() => setCategoryExpanded(!categoryExpanded)}
              >
                <span>CATEGORIES</span>
                {categoryExpanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {categoryExpanded && (
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-2 text-gray-600"
                    >
                      
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-green-500 border-green-600 rounded focus:ring-green-500 checked:bg-green-500 checked:border-green-600"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <hr className="hidden lg:block h-[0.1rem] bg-gray-600" />
            {/* Health Conditions Section */}
            <div>
              <button
                className="w-full flex justify-between items-center mb-3 text-gray-700 font-medium"
                onClick={() => setConditionExpanded(!conditionExpanded)}
              >
                <span>HEALTH CONDITION</span>
                {conditionExpanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {conditionExpanded && (
                <div className="space-y-2">
                  {healthConditions.map((condition) => (
                    <label
                      key={condition}
                      className="flex items-center space-x-2 text-gray-600"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-green-500 border-green-600 rounded focus:ring-green-500 checked:bg-green-500 checked:border-green-600"
                      />
                      <span className="text-sm">{condition}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;
