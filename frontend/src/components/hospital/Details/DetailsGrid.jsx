import React, { useEffect, useState } from 'react';
import ProductCard from './DetailsCard';
import axios from 'axios';

// Product Grid Component
const ProductGrid = ({ category }) => {
  const [hospitals, setHospitals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [hospitalsPerPage] = useState(9); // Number of cards per page

  // Fetch data on initial render or when category changes
  useEffect(() => {
    const handleApi = async () => {
      const { data } = await axios.post('http://127.0.0.1:8000/get-category-details', {
        service: 'hospital',
        category: category
      });
      setHospitals(data);
    };
    handleApi();
  }, [category]);

  // Get the hospitals to display for the current page
  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = hospitals.slice(indexOfFirstHospital, indexOfLastHospital);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Total number of pages
  const totalPages = Math.ceil(hospitals.length / hospitalsPerPage);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-16">
        {currentHospitals.map((hospital) => (
          <ProductCard
            key={hospital.id}
            image={hospital.h_image}
            name={hospital.h_name}
            location={hospital.location}
            rating={hospital.rating}
            category={hospital.category}
            specialities={hospital.specialties}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center space-x-2">
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>

          {/* Page number buttons */}
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === number + 1
                  ? 'bg-[#1FAB89] text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {number + 1}
            </button>
          ))}

          {/* Next button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
