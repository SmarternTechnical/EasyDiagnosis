import React, { useEffect, useState } from 'react';
import LabCard from './LabCard';
import axios from 'axios';
const LabGrid = ({category}) => {
  const [labs,setLabs] = useState([]);
  useEffect(()=>{
    const handleApi = async ()=>{
      const {data} = await axios.post('http://127.0.0.1:8000/get-category-details',{
        service:'lab',
        category: category ||'CT Scan'
      });
      setLabs(data);
    }
    handleApi();
  },[]);
  return (
    <div className="container mx-auto px-4 py-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-16">
        {labs.map((lab) => (
          <LabCard
            key={lab.id}
            name={lab.l_name}
            category={lab.category}
            image={lab.l_image}
            specialities={lab.specialties}
            location={lab.location}
            rating={lab.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default LabGrid;
