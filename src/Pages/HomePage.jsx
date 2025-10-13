import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import shopping from '../assets/pexels-solliefoto-298863.jpg';
import ProductCard from "../component/ProductCard";

function HomePage(){
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const url = "https://backend-mql6.onrender.com/api/products";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if(!response.ok){
          setProduct(null);
          setError("Failed to fetch products");
          return;
        }
        const product = await response.json();
        setProduct(product);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-green-300 text-gray-800 flex flex-col">
      <section
        className="relative bg-cover bg-center h-[500px] flex items-center justify-center"
        style={{ backgroundImage: `url(${shopping})` }}
      >
        <div className="bg-black bg-opacity-60 p-10 rounded text-center max-w-xl">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Welcome to ShopEasy
          </h2>
          <p className="text-white text-lg mb-6">
            Explore amazing products. Sign in to start shopping!
          </p>
          <Link
            to="/login"
            className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition"
          >
            Login to Continue
          </Link>
        </div>
      </section>

      <div className="p-8 flex flex-row gap-5 flex-wrap justify-center">
        {error && <p className="text-red-600">{error}</p>}
        {product && product.map((item) => (
          <Link to={`/products/${item.id}`} key={item.id}>
            <ProductCard
              image={item.image}
              name={item.title}
              price={item.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
