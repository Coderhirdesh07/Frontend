import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the route
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://backend-mql6.onrender.com/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow rounded">
      <img src={product.image} alt={product.title} className="w-full h-96 object-cover mb-4 rounded" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">{product.title}</h1>
      <p className="text-lg text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl font-semibold text-gray-900">${product.price}</p>
      <p className="text-md text-gray-500 italic">Category: {product.category}</p>
    </div>
  );
}

export default ProductDetails;
