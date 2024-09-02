import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Map from "../components/Map";
import {
  MdLocationOn,
  MdPlace,
  MdFastfood,
  MdAttachMoney,
  MdMoneyOff,
  MdStar,
  MdThumbUp,
} from "react-icons/md";

const UNSPLASH_ACCESS_KEY = "xxCNDNbKS_AQt6tXxmfP3n79P0Ae_PSqA_nnJTTGtis";

function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch restaurant details
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `https://zomato-like-gx27.onrender.com/restaurants/${id}`
        );
        setRestaurant(response.data);

        const imageResponse = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query: response.data.cuisines.toLowerCase(),
              per_page: 1,
            },
            headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
          }
        );

        if (imageResponse.data.results.length > 0) {
          setImage(imageResponse.data.results[0].urls.regular);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-xl text-red-800">
            Loading delicious details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative h-96">
            <img
              src={image || "https://via.placeholder.com/1200x600"}
              alt={restaurant.restaurantName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
              <div className="p-8">
                <h2 className="text-5xl font-bold text-white mb-2">
                  {restaurant.restaurantName}
                </h2>
                <p className="text-xl text-red-200">{restaurant.cuisines}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: MdLocationOn,
                  title: "Address",
                  value: `${restaurant.address}, ${restaurant.city}`,
                  color: "bg-blue-100 text-blue-800",
                },
                {
                  icon: MdPlace,
                  title: "Locality",
                  value: restaurant.locality,
                  color: "bg-green-100 text-green-800",
                },
                {
                  icon: MdFastfood,
                  title: "Cuisines",
                  value: restaurant.cuisines,
                  color: "bg-yellow-100 text-yellow-800",
                },
                {
                  icon: MdAttachMoney,
                  title: "Average Cost for Two",
                  value: `${restaurant.currency} ${restaurant.averageCostForTwo}`,
                  color: "bg-purple-100 text-purple-800",
                },
                {
                  icon: MdMoneyOff,
                  title: "Price Range",
                  value: restaurant.priceRange,
                  color: "bg-red-100 text-red-800",
                },
                {
                  icon: MdStar,
                  title: "Rating",
                  value: `${restaurant.aggregateRating} (${restaurant.ratingText})`,
                  color: "bg-teal-100 text-teal-800",
                },
                {
                  icon: MdThumbUp,
                  title: "Votes",
                  value: restaurant.votes,
                  color: "bg-indigo-100 text-indigo-800",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`${item.color} rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300`}
                >
                  <item.icon className="h-8 w-8 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-lg">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-3xl font-semibold text-gray-800 mb-6">
                Location
              </h3>
              <div className="h-96 rounded-xl overflow-hidden shadow-lg">
                <Map
                  latitude={restaurant.latitude}
                  longitude={restaurant.longitude}
                  address={restaurant.address}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-wrap justify-between mb-8">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h2 className="text-2xl font-semibold mb-4">About Us</h2>
              <p className="text-gray-400">
                Discover the best culinary experiences in your area. We provide
                curated lists of top-rated restaurants to make dining out an
                unforgettable experience.
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
              <ul>
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/restaurants"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Restaurants
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search/location"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Location Search
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search/image"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Image Search
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
              <div className="flex space-x-4">
                <a
                  href="www.facebook.com"
                  className="text-gray-400 hover:text-white transition"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <p className="text-center text-gray-400">
              &copy; {new Date().getFullYear()} MyRestaurant. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default RestaurantDetail;
