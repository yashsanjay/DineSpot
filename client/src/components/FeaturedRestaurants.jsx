import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FeaturedRestaurants = () => {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedRestaurants = async () => {
      try {
        const response = await axios.get(
          "https://zomato-like-gx27.onrender.com/restaurants/featured"
        );
        setFeaturedRestaurants(response.data);
      } catch (error) {
        setError(
          "Failed to fetch featured restaurants. Please try again later."
        );
        console.error("Error fetching featured restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading featured restaurants...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="rounded-2xl p-10 w-full max-w-screen-xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-yellow-300 mb-4">
            Featured Restaurants
          </h1>
          <p className="text-gray-600 text-lg">
            Discover top-rated dining spots handpicked for you
          </p>
        </div>
        <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredRestaurants.map((restaurant, index) => (
            <Link
              key={index}
              to={`/restaurants/${restaurant.restaurantId}`}
              className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-full h-40 mb-4  overflow-hidden">
                <img
                  src={`https://picsum.photos/500/300?random=${restaurant.restaurantId}`}
                  alt={restaurant.restaurantName}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-300">
                {restaurant.restaurantName}
              </h2>
              <p className="text-gray-600 mt-2 text-center">
                {restaurant.locality}
              </p>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default FeaturedRestaurants;
