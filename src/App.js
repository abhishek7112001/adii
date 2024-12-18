import React from "react";
import Items from "./components/Items.jsx"; // Importing the Items component

function App() {
  return (
    <div className="flex flex-col items-center p-8 bg-black">
      <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
        Shopping Cart
      </h1>
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-200 p-4 rounded-lg mb-6">
          <h2 className="font-semibold text-gray-700">Products</h2>
          <h2 className="font-semibold text-gray-700">Price</h2>
          <h2 className="font-semibold text-gray-700">Quantity</h2>
          <h2 className="font-semibold text-gray-700">Total</h2>
        </div>

        {/* Add products here */}
        <Items />
      </div>
    </div>
  );
}

export default App;
