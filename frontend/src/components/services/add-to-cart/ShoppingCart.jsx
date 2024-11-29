import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../Dropdown/Profile/components/utils";
import { FaMapMarkerAlt, FaTrash } from "react-icons/fa";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true);
      try {
        const token = getCookie("accessToken");

        if (!token) {
          setError("No access token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/get-cart/", {
          headers: {
            Authorization: `Bearer ${token}`, // Replace <your_token> with a valid token
          },
          withCredentials:true,
        });
        console.log(response.data)
        setCartItems(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError("Failed to load cart items. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.discounted_price * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const discount = 15;
  const handlingFee = 4;
  const subsidisedDelivery = 25;
  const toPay = cartTotal - discount + handlingFee;

  if (isLoading) {
    return (
      <div className="text-center mt-8">
        <p>Loading cart items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-600">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container p-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 pl-4 text-[#19456b]">
            MY CART
          </h2>
          <div className="bg-white p-4">
            <div className="flex items-center justify-between border rounded-md px-4 py-3 shadow-sm bg-white text-gray-500">
              <div className="flex items-center flex-1">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Add address to proceed with the order"
                  className="w-full focus:outline-none text-gray-600"
                />
              </div>
              <button className="text-[#1fab89] font-bold hover:underline flex items-center">
                + ADD
              </button>
            </div>
            <h3 className="text-2xl font-bold mb-2 mt-4 text-[#19456b]">
              ITEM(S) IN YOUR CART ({totalQuantity})
            </h3>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="relative flex items-center border p-4 rounded-md mb-4 bg-[#dbdbdb] text-[#19456b]"
              >
                <img
                  src="https://via.placeholder.com/50"
                  alt={item.product_name || "Product Image"}
                  className="w-12 h-12 object-cover mr-4"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.product_name || "Unknown Item"}</h4>
                  <p>MRP ₹{item.discounted_price || "N/A"}</p>
                  <p>Delivery By: Tomorrow, before 10:00 pm</p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute right-0 top-2 px-4 text-[#1fab89]"
                >
                  <FaTrash />
                </button>
                <div className="flex items-center border border-1 border-[#19456b]">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="border px-2 py-0"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity || 1}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="border px-2 py-0"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <button className="border w-1/3 p-2 text-center rounded-md mt-4 text-[#19456b] font-semibold">
                ADD MORE MEDICINES
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-lg rounded-md text-[#19456b]">
            <h3 className="text-2xl font-bold mb-4">CART BREAKDOWN</h3>
            <div className="flex justify-between mb-2">
              <span>Cart Total</span>
              <span>Rs. {cartTotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount on MRP</span>
              <span className="text-[#1fab89]">-Rs. {discount}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Handling & Packaging Fee</span>
              <span>Rs. {handlingFee}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-semibold mt-2">
              <span>TO PAY</span>
              <span>Rs. {toPay}</span>
            </div>
            <button className="bg-[#1fab89] text-white px-4 py-2 rounded-md w-full mt-4">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { getCookie } from "../../Dropdown/Profile/components/utils";
// import { FaMapMarkerAlt, FaTrash } from "react-icons/fa";

// const ShoppingCart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [productDetails, setProductDetails] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       setIsLoading(true);
//       try {
//         const token = getCookie("accessToken");

//         if (!token) {
//           setError("No access token found. Please log in.");
//           setIsLoading(false);
//           return;
//         }

//         const response = await axios.get("http://127.0.0.1:8000/get-cart/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         });

//         const items = response.data;
//         setCartItems(items);
//         setError(null);

//         // Fetch product details for each p_id
//         await Promise.all(
//           items.map(async (item) => {
//             const resp = await axios.post(
//               `http://127.0.0.1:8000/get-category-details?pid=${item.p_id}`,
//               {
//                 service: "medicines",
//                 category: "default-category", // Replace with the actual category if available
//               }
//             );
//             setProductDetails((prev) => ({
//               ...prev,
//               [item.p_id]: resp.data[0], // Store product details by p_id
//             }));
//           })
//         );
//       } catch (err) {
//         console.error("Error fetching cart items or product details:", err);
//         setError("Failed to load cart items. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   const updateQuantity = (id, delta) => {
//     setCartItems((items) =>
//       items.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + delta) }
//           : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setCartItems((items) => items.filter((item) => item.id !== id));
//   };

//   if (isLoading) {
//     return (
//       <div className="text-center mt-8">
//         <p>Loading cart items...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center mt-8 text-red-600">
//         <p>{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="bg-red-500 text-white px-4 py-2 rounded mt-4"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container p-12">
//       <h2 className="text-2xl font-bold mb-4 text-[#19456b]">MY CART</h2>
//       {cartItems.map((item) => {
//         const details = productDetails[item.p_id] || {};
//         return (
//           <div
//             key={item.id}
//             className="relative flex items-center border p-4 rounded-md mb-4 bg-[#dbdbdb] text-[#19456b]"
//           >
//             <img
//               src={details.product_image || "https://via.placeholder.com/50"}
//               alt={details.product_name || "Product Image"}
//               className="w-12 h-12 object-cover mr-4"
//             />
//             <div className="flex-1">
//               <h4 className="font-semibold">
//                 {details.product_name || "Unknown Item"}
//               </h4>
//               <p>MRP ₹{details.discounted_price || "N/A"}</p>
//               <p>Delivery By: Tomorrow, before 10:00 pm</p>
//             </div>
//             <button
//               onClick={() => removeItem(item.id)}
//               className="absolute right-0 top-2 px-4 text-[#1fab89]"
//             >
//               <FaTrash />
//             </button>
//             <div className="flex items-center border border-1 border-[#19456b]">
//               <button
//                 onClick={() => updateQuantity(item.id, -1)}
//                 className="border px-2 py-0"
//               >
//                 -
//               </button>
//               <span className="mx-2">{item.quantity || 1}</span>
//               <button
//                 onClick={() => updateQuantity(item.id, 1)}
//                 className="border px-2 py-0"
//               >
//                 +
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ShoppingCart;
