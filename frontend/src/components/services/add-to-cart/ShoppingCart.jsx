import React, { useState } from "react";
import { FaMapMarkerAlt, FaTrash } from "react-icons/fa";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Himalaya Baby Powder 50 g", price: 450, quantity: 1 },
    { id: 2, name: "Himalaya Baby Powder 50 g", price: 450, quantity: 1 },
  ]);

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
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const discount = 15;
  const handlingFee = 4;
  const subsidisedDelivery = 25;
  const totalSavings = discount + subsidisedDelivery;
  const toPay = cartTotal - discount + handlingFee;

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
                  alt={item.name}
                  className="w-12 h-12 object-cover mr-4"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p>MRP ₹{item.price}</p>
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
                  <span className="mx-2">{item.quantity}</span>
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
          <div className="bg-white p-4 rounded-md shadow mb-4 text-[#19456b]">
            <h3 className="text-2xl font-bold text-[#19456b]">OFFERS & DISCOUNTS</h3>
            <div className="bg-teal-100 p-3 rounded-md mt-4 text-teal-700">
              Save ₹111.45 on this order{" "}
              <button className="text-[#1fab89] underline ml-2">
                View Plans
              </button>
            </div>
            <div className="border-t mt-4 pt-4">
              <button className="border w-full p-2 rounded-md mb-2">
                Apply Coupon
              </button>
              <button className="border w-full p-2 rounded-md">
                Use Health Credits
              </button>
            </div>
          </div>
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
            <div className="flex justify-between mb-2">
              <span>Delivery Charges</span>
              <button className="text-blue-500 underline">+ Add Address</button>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-semibold mt-2">
              <span>TO PAY</span>
              <span>Rs. {toPay}</span>
            </div>
            <div className="flex items-center justify-between bg-[#dbdbdb] p-3 mt-4 rounded-md">
              <span className="font-semibold">Amount to Pay</span>
              <span className="text-xl text-[#1fab89] font-bold">₹{toPay}</span>
              <button className="bg-[#1fab89] text-white px-4 py-2 rounded-md ml-2 font-bold">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
