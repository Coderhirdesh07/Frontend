import React from "react";

function ProductCard({ image, name, price, onAddToCart }){
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-sm">
      <img
        src={image}
        alt={name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-green-600 text-xl font-bold mt-2">₹{price}</p>
        <button
          onClick={onAddToCart}
          className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
