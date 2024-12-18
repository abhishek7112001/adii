import React, { useState } from "react";

const Items = () => {
  // State to hold product details and quantity
  const [items, setItems] = useState([
    { id: 1, name: "Belt", price: 100, quantity: 1, image: "./belt.jpg" },
    { id: 2, name: "Shoe", price: 200, quantity: 1, image: "./shoes.jpg" },
    { id: 3, name: "T-shirt", price: 300, quantity: 1, image: "./tshirt.jpg" },
  ]);

  const [promoCode, setPromoCode] = useState(""); // State to manage the promo code
  const [discount, setDiscount] = useState(0); // Discount after applying promo code

  // Function to handle quantity change (add/subtract)
  const handleQuantityChange = (id, action) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "add"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  // Calculate the subtotal for each item
  const getItemTotal = (item) => item.price * item.quantity;

  // Calculate the total price before applying GST and discounts
  const getGrandTotal = () => {
    const total = items.reduce((sum, item) => sum + getItemTotal(item), 0);
    return total;
  };

  // Calculate the GST (18% of total)
  const getGST = () => (getGrandTotal() * 18) / 100;

  // Apply promo code (flat or percentage discount)
  const applyPromoCode = () => {
    if (promoCode === "FLAT500") {
      setDiscount(500); // Flat 500 discount
    } else if (promoCode === "DISCOUNT20") {
      setDiscount(Math.min(0.2 * getGrandTotal(), 500)); // 20% discount, max INR 500
    } else {
      setDiscount(0); // Invalid promo code
    }
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 bg-white border-b border-gray-300 rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          <div className="flex items-center space-x-4">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
            <div>{item.name}</div>
          </div>
          <div className="text-lg font-medium text-gray-700">₹{item.price}</div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(item.id, "subtract")}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-all duration-200"
            >
              -
            </button>
            <span className="font-semibold text-lg">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.id, "add")}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-all duration-200"
            >
              +
            </button>
          </div>
          <div className="text-lg font-medium text-gray-700">₹{getItemTotal(item)}</div>
        </div>
      ))}

      {/* Promo Code Section */}
      <div className="mt-8 p-6 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Apply Promo Code</h3>
        <select
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="p-3 w-full border border-gray-400 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Promo Code</option>
          <option value="FLAT500">FLAT500 - ₹500 Off</option>
          <option value="DISCOUNT20">DISCOUNT20 - 20% Off (Max ₹500)</option>
        </select>
        <button
          onClick={applyPromoCode}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-full transition-all duration-300"
        >
          Apply Promo Code
        </button>
        {discount > 0 && <div className="mt-3 text-green-500">Discount Applied: ₹{discount}</div>}
      </div>

      {/* Grand Total Section */}
      <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="flex justify-between mb-2 text-lg font-medium text-gray-700">
          <span>Subtotal:</span>
          <span>₹{getGrandTotal()}</span>
        </div>
        <div className="flex justify-between mb-2 text-lg font-medium text-gray-700">
          <span>GST (18%):</span>
          <span>₹{getGST()}</span>
        </div>
        <div className="flex justify-between mb-2 text-lg font-medium text-gray-700">
          <span>Discount:</span>
          <span>- ₹{discount}</span>
        </div>
        <div className="flex justify-between text-xl font-semibold text-gray-800">
          <span>Grand Total:</span>
          <span>₹{getGrandTotal() + getGST() - discount}</span>
        </div>
      </div>
    </div>
  );
};

export default Items;
