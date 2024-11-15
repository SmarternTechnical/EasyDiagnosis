// import React,{useState,useEffect} from 'react'
// import ProductDetails from './ProductDetails'
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ProductViewDetail = () => {
//   const {id, category} = useParams();
//   const [details,setdetails] = useState({});
//   const decodedLabel = decodeURIComponent(category);
//   useEffect(()=>{
//     const handleApi = async()=>{
//       try {
//         console.log(id+" "+decodedLabel);
//         const resp = await axios.post(`http://127.0.0.1:8000/get-category-details?pid=${id}`,{
//           service:'medicines',
//           category:decodedLabel
//         })
        
//         // console.log(resp.data[0]);
//         setdetails(resp.data[0]);
//       } catch (error) {
//         console.log("error: ",error);
//       }
//     }
//     handleApi();
//   },[id, decodedLabel]);
//   return (
//     <div className='container bg-[#f3f3f3]'>
//     <div>
        
//     </div>
//       <div className='p-5'>
//       <ProductDetails  name={details.product_name} 
//         product_image={details.product_image} 
//         actual_product_price={details.actual_product_price}
//         discounted_price={details.discounted_price}
//         description={details.description}
//       />
//       </div>
//     </div>
//   )
// }

// export default ProductViewDetail


import React, { useState, useEffect } from 'react';
import ProductDetails from './ProductDetails';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductViewDetail = () => {
  const { id, category } = useParams();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const decodedLabel = decodeURIComponent(category);

  useEffect(() => {
    const handleApi = async () => {
      setIsLoading(true);
      try {
        const resp = await axios.post(`http://127.0.0.1:8000/get-category-details?pid=${id}`, {
          service: 'medicines',
          category: decodedLabel
        });
        
        setDetails(resp.data[0]);
        setError(null);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    handleApi();
  }, [id, decodedLabel]);

  // Loading Skeleton
  const ProductDetailsSkeleton = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Skeleton */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <Skeleton height={400} className="mb-4" />
          <Skeleton count={3} />
        </div>
        
        {/* Details Skeleton */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <Skeleton height={40} width={300} className="mb-4" />
          <Skeleton height={20} width={200} className="mb-4" />
          <Skeleton count={5} className="mb-2" />
        </div>
      </div>
    </div>
  );

  // Error Component
  const ErrorComponent = () => (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-6 rounded relative" role="alert">
        <strong className="font-bold block mb-2">Oops! Something went wrong</strong>
        <span className="block">Unable to load product details. Please try again later.</span>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-[#f3f3f3]'>
      <div className='container mx-auto px-4 py-8'>
        {isLoading ? (
          <ProductDetailsSkeleton />
        ) : error ? (
          <ErrorComponent />
        ) : details ? (
          <ProductDetails
            name={details.product_name}
            category={decodedLabel}
            product_image={details.product_image}
            actual_product_price={details.actual_product_price}
            discounted_price={details.discounted_price}
            description={details.description}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProductViewDetail;