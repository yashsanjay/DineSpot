import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Star, MapPin, ChevronRight } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading featured restaurants...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Restaurants
          </h2>
          <p className="text-xl text-gray-300">
            Discover top-rated dining spots handpicked for you
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.restaurantId}
              to={`/restaurants/${restaurant.restaurantId}`}
              className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 w-full">
                <img
                  src={`https://picsum.photos/500/300?random=${restaurant.restaurantId}`}
                  alt={restaurant.restaurantName}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:opacity-0"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">
                  {restaurant.restaurantName}
                </h3>
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  <p className="text-gray-400">{restaurant.locality}</p>
                  <ChevronRight className="w-5 h-5 float-end text-indigo-400 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
               
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;