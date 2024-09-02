import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdLocationOn, MdSearch, MdRestaurant } from "react-icons/md";

const getRandomColor = () => {
  const colors = [
    "from-green-400 to-green-600",
    "from-blue-400 to-blue-600",
    "from-yellow-400 to-yellow-600",
    "from-pink-400 to-pink-600",
    "from-teal-400 to-teal-600",
    "from-red-400 to-red-600",
    "from-orange-400 to-orange-600",
    "from-purple-400 to-purple-600",
    "from-indigo-400 to-indigo-600",
    "from-gray-400 to-gray-600",
    "from-pink-600 to-pink-800",
    "from-orange-600 to-orange-800",
    "from-purple-600 to-purple-800",
    "from-indigo-600 to-indigo-800",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

function LocationSearch() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [radius, setRadius] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [locationError, setLocationError] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setLocationError("Unable to retrieve your location.");
          console.error(error);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSearch = async () => {
    if (!radius || isNaN(radius) || parseFloat(radius) <= 0) {
      setInputError("Please enter a valid distance in kilometers.");
      return;
    }

    if (latitude && longitude && radius) {
      setLoading(true);
      setInputError("");
      try {
        const response = await axios.get(
          "https://zomato-like-gx27.onrender.com/restaurants/search/location",
          {
            params: {
              lat: latitude,
              long: longitude,
              radius: parseFloat(radius),
            },
          }
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error searching restaurants:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setInputError("Please ensure all fields are filled out.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
        <div className="max-w-full md:max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 md:p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center">
              <MdLocationOn className="mr-3 md:mr-4 text-3xl md:text-4xl" />
              Find Restaurants Near You
            </h2>
            <p className="text-base md:text-lg opacity-90">
              Discover delicious dining options in your area
            </p>
          </div>

          <div className="p-4 md:p-8">
            {locationError ? (
              <p className="text-red-500 mb-4">{locationError}</p>
            ) : (
              <>
                <div className="flex flex-col md:flex-row items-center mb-6">
                  <input
                    type="text"
                    placeholder="Distance in kilometers"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="flex-grow mb-4 md:mb-0 p-3 border-2 border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500 shadow-sm"
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center"
                  >
                    <MdSearch className="mr-2" />
                    Search
                  </button>
                </div>
                {inputError && (
                  <p className="text-red-500 mb-4">{inputError}</p>
                )}

                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">
                      Searching for restaurants...
                    </p>
                  </div>
                ) : (
                  <div className="mt-6">
                    {restaurants.length === 0 ? (
                      <p className="text-gray-500 text-center py-12">
                        No restaurants found in your locality.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        {restaurants.map((restaurant) => (
                          <Link
                            key={restaurant.restaurantId}
                            to={`/restaurants/${restaurant.restaurantId}`}
                            className="block group"
                          >
                            <div
                              className={`bg-gradient-to-br ${getRandomColor()} p-4 md:p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105`}
                            >
                              <MdRestaurant className="text-3xl md:text-4xl text-white mb-4" />
                              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                                {restaurant.restaurantName}
                              </h3>
                              <p className="text-white opacity-80">
                                {restaurant.locality}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
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

export default LocationSearch;
