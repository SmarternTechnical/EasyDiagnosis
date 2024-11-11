import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import ProductCard from './ProductCard'; // Import the ProductCard component
import img from '../../../../assets/drimg.jpeg'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// Toast Notification Component


// Product Grid Component
const ProductGrid = ({category}) => {
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [doctors,setDoctors] = useState([]);


  useEffect(()=>{
    const handleApi = async ()=>{
      const {data} = await axios.post('http://127.0.0.1:8000/get-category-details/',{
        service:'doctor',
        category:category
      });
      setDoctors(data);
    };
    handleApi();
  },[]);

  return (
    <div className="container mx-auto px-4 py-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-16">
        {doctors.map((doctor) => (
          <ProductCard
            keyy={doctor.id}
            image={doctor.d_image}
            label={doctor.expertise|| "label"}
            name={doctor.d_name}
            expert={doctor.expertise}
            price={doctor.price}
            qualification={doctor.qualification}
            location={doctor.location}
            language={doctor.languages}
            experience={doctor.work_experience}
            rating={doctor.rating}
            onViewDetails={() => addToCart(doctor)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
