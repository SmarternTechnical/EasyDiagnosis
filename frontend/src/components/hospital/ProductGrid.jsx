import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';


// Product Grid Component
const ProductGrid = ({category}) => {
  const [hospitals,setHospitals] = useState([]);
  useEffect(()=>{
    const handleApi = async ()=>{
      const {data} = await axios.post('http://127.0.0.1:8000/get-category-details',{
        service:'hospital',
        category: category
      });
      setHospitals(data);
    }
    handleApi();
  },[]);

  return (
    <div className="container mx-auto px-4 py-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-16">
        {hospitals.map((hospital) => (
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
    </div>
  );
};

export default ProductGrid;
