import React,{useState,useEffect} from 'react'
import ProductDetails from './ProductDetails'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductViewDetail = () => {
  const {id, category} = useParams();
  const [details,setdetails] = useState({});
  const decodedLabel = decodeURIComponent(category);
  useEffect(()=>{
    const handleApi = async()=>{
      try {
        const resp = await axios.post(`http://127.0.0.1:8000/get-category-details?pid=${id}`,{
          service:'medicines',
          category:decodedLabel
        })
        console.log(id);
        console.log(resp);
        setdetails(resp.data[0]);
      } catch (error) {
        console.log("error: ",error);
      }
    }
    handleApi();
  },[id, decodedLabel]);
  return (
    <div className='container bg-[#f3f3f3]'>
    <div>
        
    </div>
      <div className='p-5'>
      <ProductDetails  name={details.product_name} 
        product_image={details.product_image} 
        actual_product_price={details.actual_product_price}
        discounted_price={details.discounted_price}
        description={details.description}
      />
      </div>
    </div>
  )
}

export default ProductViewDetail
