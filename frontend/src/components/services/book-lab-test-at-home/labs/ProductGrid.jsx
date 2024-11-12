import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import ProductCard from './ProductCard'; // Import the ProductCard component
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// Toast Notification Component


// Product Grid Component
const ProductGrid = ({category}) => {
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [labs,setLabs] = useState([]);


  useEffect(()=>{
    const handleApi = async ()=>{
      const {data} = await axios.post('http://127.0.0.1:8000/get-category-details',{
        service:'lab',
        category:category
      });
      setLabs(data);
      console.log("Fetched categories:", data);
    };
    handleApi();
  },[]);

  return (
    <div className="container mx-auto px-4 py-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-16">
        {labs.map((lab) => (
          <ProductCard
            key={lab.id}
            l_image={lab.l_image}
            category={lab.category}
            specialties={lab.specialties}
            l_name={lab.l_name}
            location={lab.location}
            onViewDetails={() => addToCart(doctor)}
          />
        ))}
      </div>
    </div>
  );
};
export default ProductGrid;
