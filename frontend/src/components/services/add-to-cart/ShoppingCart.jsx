import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../Dropdown/Profile/components/utils";
import { FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import img from "/images/Doctor1.png";
import img2 from "/emptyCart.webp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true);
      try {
        const token = getCookie("accessToken");
        if (!token) throw new Error("No access token found. Please log in.");

        const { data } = await axios.get("http://127.0.0.1:8000/get-cart/", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setCartItems(data);
      } catch (err) {
        setError(err.message || "Failed to load cart items. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Render empty cart state
  if (isLoading) {
    return <div className="text-center mt-8">Loading cart items...</div>;
  }

  if (!cartItems.length) {
    return (
      <div className="text-center mt-8 mb-8">
        <img src={img2} alt="Empty Cart" className="w-1/6 h-1/6 mx-auto" />
        <p>Your cart is empty.</p>
        <Link to="/services/buy-medicines/products/Medicines">
          <button className="bg-[#1fab89] text-white px-4 py-2 rounded mt-4">
            Shop Now
          </button>
        </Link>
      </div>
    );
  }

  // Render error state
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

  // Handle quantity update and item removal
  const updateQuantity = async (id, productId, actionType) => {
    try {
      const token = getCookie("accessToken");

      if (actionType === "decrement") {
        const item = cartItems.find((item) => item.id === id);
        if (item.item_count === 1) {
          return removeItem(id, productId);
        }
      }

      const payload = {
        product_id: productId,
        del_one: actionType === "decrement" ? "1" : "0",
        del_full: "0",
      };

      await axios.post("http://127.0.0.1:8000/add-to-cart/", payload, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setCartItems((items) =>
        items.map((item) =>
          item.id === id
            ? {
                ...item,
                item_count:
                  actionType === "decrement"
                    ? item.item_count - 1
                    : item.item_count + 1,
              }
            : item
        )
      );
    } catch (err) {
      console.error("Error updating item quantity:", err);
      setError("Failed to update item quantity. Please try again.");
    }
  };

  const removeItem = async (id, productId) => {
    try {
      const token = getCookie("accessToken");
      await axios.post(
        "http://127.0.0.1:8000/add-to-cart/",
        { product_id: productId, del_one: "0", del_full: "1" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems((items) => items.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Failed to remove item. Please try again.");
    }
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const priceMatch = item.discounted_price.match(/[\d,]+(\.\d+)?/);
    const price = priceMatch ? parseFloat(priceMatch[0].replace(/,/g, "")) : 0;
    return total + price * item.item_count;
  }, 0);

  const formattedCartTotal = cartTotal.toFixed(2);
  const totalQuantity = cartItems.reduce((total, item) => total + item.item_count, 0);
  const discount = 15;
  const handlingFee = 4;
  const toPay = formattedCartTotal - discount + handlingFee;

  const handleRazorpayScreen = async (amount) => {
    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!res) {
        alert("Error loading Razorpay screen");
        return;
      }

      const options = {
        key: import.meta.env.VITE_API_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "EasyDiagnosis",
        description: "Payment to EasyDiagnosis",
        image: img,
        handler: async function () {
          setTimeout(() => {
            // Trigger success toast with a slight delay
            toast.success("Order placed successfully!");
          }, 0);
          for (const item of cartItems) {
            await deleteItemFromCart(item);
          }
        },
        prefill: {
          name: "Papaya Coders",
          email: "papayacoders@gmail.com",
        },
        theme: {
          color: "#1fab89",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error loading Razorpay payment screen:", error);
      toast.error("Failed to load Razorpay payment screen");
    }
  };

  const deleteItemFromCart = async (itemId) => {
    removeItem(itemId.id, itemId.p_id);
    setCartItems((prev) => prev.filter((item) => item.id !== itemId.id));
  };

  const handleClick = async (toPay) => {
    try {
      await handleRazorpayScreen(toPay);
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div className="container p-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-[#19456b]">MY CART</h2>

          <div className="bg-white p-4">
            <div className="flex items-center justify-between border rounded-md px-4 py-3 bg-gray-100">
              <div className="flex items-center flex-1">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Add address to proceed with the order"
                  className="w-full bg-gray-100 focus:outline-none text-gray-600"
                />
              </div>
              <button className="text-[#1fab89] font-bold hover:underline">
                + ADD
              </button>
            </div>

            <h3 className="text-2xl font-bold my-4 text-[#19456b]">
              ITEM(S) IN YOUR CART ({totalQuantity})
            </h3>

            {cartItems.map((item) => (
              <Link
                key={item.id}
                to={`/services/buy-medicines/products/details/${item.category}/${item.p_id}`}
                className="relative flex items-center border p-4 rounded-md mb-4 bg-[#e3e8e3] text-[#19456b]"
              >
                <img
                  src={`/${item.product_image}`}
                  alt={item.product_name}
                  className="w-12 h-12 object-cover mr-4"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">
                    {item.product_name || "Unknown Item"}
                  </h4>
                  <p>MRP {item.discounted_price || 200}</p>
                  <p>Delivery By: Tomorrow, before 10:00 pm</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent link navigation on button click
                    removeItem(item.id, item.p_id);
                  }}
                  className="absolute right-0 top-2 px-4 text-[#1fab89]"
                >
                  <FaTrash />
                </button>
                <div className="flex items-center border border-[#19456b]">
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent link navigation on button click
                      updateQuantity(item.id, item.p_id, "decrement");
                    }}
                    className="border px-2 py-0"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.item_count || 1}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent link navigation on button click
                      updateQuantity(item.id, item.p_id, "increment");
                    }}
                    className="border px-2 py-0"
                  >
                    +
                  </button>
                </div>
              </Link>
            ))}

            <Link to={"/services/buy-medicines/products/Medicines"}>
              <button className="border w-full p-2 rounded-md mt-4 bg-[#e3e8e3] text-[#19456b] font-semibold hover:bg-[#1fab89] hover:text-white">
                ADD MORE ITEMS
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-lg rounded-md text-[#19456b]">
            <h3 className="text-2xl font-bold mb-4">CART BREAKDOWN</h3>
            <div className="flex justify-between mb-2">
              <span>Cart Total</span>
              <span>Rs. {formattedCartTotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span className="text-[#1fab89]">-Rs. {discount}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Handling Fee</span>
              <span>Rs. {handlingFee}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-semibold">
              <span>TO PAY</span>
              <span>Rs. {toPay}</span>
            </div>
            <button
              onClick={() => handleClick(toPay)}
              className="bg-[#1fab89] text-white px-4 py-2 rounded-md w-full mt-4 hover:scale-105 transform transition-all duration-300"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;