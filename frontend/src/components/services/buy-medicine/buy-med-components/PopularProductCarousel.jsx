// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, X } from 'lucide-react';
// import ProductCard from '../../products/ProductCard';
// import axios from 'axios';


// const Toast = ({ message, onClose }) => (
//   <div className="fixed top-4 right-4 flex items-center bg-white border border-green-500 shadow-lg rounded-lg p-4 animate-slide-in">
//     <span className="text-green-500 mr-2">✓</span>
//     <span className="text-gray-700">{message}</span>
//     <button onClick={onClose} className="ml-4">
//       <X className="w-4 h-4 text-gray-500" />
//     </button>
//   </div>
// );

// const ProductCarousel = () => {
//   const [cart, setCart] = useState([]);
//   const [showToast, setShowToast] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
//   useEffect(()=>{
//     const handleApi = async ()=>{
//       const {data} = await axios.post('http://127.0.0.1:8000/get-category-details/',{
//         service:'medicines',
//         category:'Medicines'
//       })
//       console.log("hola");
//       console.log(data);
//     };
//     handleApi();
//   },[]);
//   // Sample product data
//   const products = Array(12).fill({
//     id: 1,
//     image: "https://s3-alpha-sig.figma.com/img/e811/c3c6/317d254716f47a278c3f6a0ad528952d?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TZo09XjHYFJjq5-FkGO3yHXEPGezMZ9vg0YllFczyPWwTyORvWurn8wd67IQ9BXgDlaNE6cigyj9jJ0EuDteQBnxoXZU3YgAKDdSNQuzdt6hcBUNTofHdo3Gx3Ki~bJCWg1MBCEwpxr6Ib1MbVetfPlQoqj9WEf9MHaywVJfwpqKSy-N57yq1CyAW2B7NY0di7IGB9zFb82x7Ui5FWgFH1WXWvZ0q-CAdo6Wj9Mg2~FXwkZvOu-RZUehCbDoYo5Yx~J12WHG54O-mTnzdYoWlWIukEq8UPh6CCYxDRyZ-CdXTF1INFsasIMMHhXuk3i9S8D4AMIRrIR1JlKq~0LdPg__",
//     category: "Medicine",
//     name: "Cipla Cetrizine, 10mg",
//     packSize: "10 Tablets",
//     mrp: 800,
//     discountedPrice: 450,
//     cashback: "5.00"
//   }).map((product, index) => ({ ...product, id: index + 1 }));

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const getSlidesToShow = () => {
//     if (windowWidth >= 1024) return 4; // Large screens
//     if (windowWidth >= 768) return 2;  // Medium screens
//     return 1;                          // Small screens
//   };

//   const slidesPerView = getSlidesToShow();
//   const maxIndex = Math.ceil(products.length / slidesPerView) - 1;

//   const nextSlide = () => {
//     setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
//   };

//   const addToCart = (product) => {
//     setCart([...cart, product]);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   // Group products into slides
//   const slides = [];
//   for (let i = 0; i < products.length; i += slidesPerView) {
//     slides.push(products.slice(i, i + slidesPerView));
//   }

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-[#19456b] text-xl font-semibold mb-6">
//         Products <span className="text-[#19456b]">- Total Items ({products.length})</span>
//       </h1>

//       <div className="relative w-full overflow-hidden">
//         <button
//           onClick={prevSlide}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
//         >
//           <ChevronLeft className="w-6 h-6 text-gray-600" />
//         </button>

//         <div className="relative overflow-hidden">
//           <div
//             className="flex transition-transform duration-500 ease-in-out"
//             style={{ 
//               transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
//               width: `${slides.length * 100}%`
//             }}
//           >
//             {slides.map((slideProducts, slideIndex) => (
//               <div 
//                 key={slideIndex} 
//                 className="flex-shrink-0"
//                 style={{ width: `${100 / slides.length}%` }}
//               >
//                 <div className={`grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4`}>
//                   {slideProducts.map((product) => (
//                     <ProductCard
//                       key={product.id}
//                       image={product.image}
//                       category={product.category}
//                       name={product.name}
//                       packSize={product.packSize}
//                       mrp={product.mrp}
//                       discountedPrice={product.discountedPrice}
//                       cashback={product.cashback}
//                       onAddToCart={() => addToCart(product)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button
//           onClick={nextSlide}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
//         >
//           <ChevronRight className="w-6 h-6 text-gray-600" />
//         </button>
//       </div>

//       <div className="flex justify-center mt-4 pt-4 gap-3">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-12 h-3 rounded-full transition-colors ${
//               index === currentIndex ? 'bg-teal-600' : 'bg-gray-300'
//             }`}
//           />
//         ))}
//       </div>

//       {showToast && (
//         <Toast 
//           message="Product added to cart successfully!" 
//           onClose={() => setShowToast(false)} 
//         />
//       )}
//     </div>
//   );
// };

// export default ProductCarousel;


import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import ProductCard from '../../products/ProductCard';
import axios from 'axios';

const Toast = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 flex items-center bg-white border border-green-500 shadow-lg rounded-lg p-4 animate-slide-in">
    <span className="text-green-500 mr-2">✓</span>
    <span className="text-gray-700">{message}</span>
    <button onClick={onClose} className="ml-4">
      <X className="w-4 h-4 text-gray-500" />
    </button>
  </div>
);

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleApi = async () => {
      try {
        const { data } = await axios.post('http://127.0.0.1:8000/get-category-details/', {
          service: 'medicines',
          category: 'Medicines'
        });
        // console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    handleApi();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSlidesToShow = () => {
    if (windowWidth >= 1024) return 4; // Large screens
    if (windowWidth >= 768) return 2;  // Medium screens
    return 1;                          // Small screens
  };

  const slidesPerView = getSlidesToShow();
  const maxIndex = Math.ceil(products.length / slidesPerView) - 1;

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Group products into slides
  const slides = [];
  for (let i = 0; i < products.length; i += slidesPerView) {
    slides.push(products.slice(i, i + slidesPerView));
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-[#19456b] text-2xl font-semibold mb-6">
        Products <span className="text-[#19456b]">- Total Items ({products.length})</span>
      </h1>

      <div className="relative w-full overflow-hidden">
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
              width: `${slides.length * 100}%`
            }}
          >
            {slides.map((slideProducts, slideIndex) => (
              <div 
                key={slideIndex} 
                className="flex-shrink-0"
                style={{ width: `${100 / slides.length}%` }}
              >
                <div className={`grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4`}>
                  {slideProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      image={product.product_image}
                      category={product.category}
                      name={product.product_name}
                      packSize={product.packSize || "N/A"} // Add default if `packSize` not in data
                      mrp={product.actual_product_price}
                      discountedPrice={product.discounted_price}
                      cashback={product.cashback || "0.00"} // Add default if `cashback` not in data
                      onAddToCart={() => addToCart(product)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="flex justify-center mt-4 pt-4 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-12 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-teal-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {showToast && (
        <Toast 
          message="Product added to cart successfully!" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
};

export default ProductCarousel;
