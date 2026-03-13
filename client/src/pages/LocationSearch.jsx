import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdLocationOn, MdSearch } from "react-icons/md";
import Footer from "../components/Footer";

const getRandomGradient = () => {
  const gradients = [
    "from-gray-700 to-gray-900",
    "from-black to-gray-800",
    "from-gray-600 to-gray-700",
    "from-gray-500 to-gray-600",
    "from-black to-gray-700",
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
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
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-4 md:p-8">
        <div className="max-w-full mt-32 md:max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-black p-6 md:p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center">
              <MdLocationOn className="mr-3 md:mr-4 text-3xl md:text-4xl text-gray-400" />
              Find Restaurants Near You
            </h2>
            <p className="text-base md:text-lg text-gray-400">
              Discover delicious dining options in your area
            </p>
          </div>

          <div className="p-4 md:p-8 bg-gray-900">
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
                    className="flex-grow mb-4 md:mb-0 p-3 border-2 border-gray-600 rounded-l-lg focus:outline-none focus:border-gray-500 shadow-sm bg-gray-800 text-white"
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-3 rounded-r-lg hover:from-gray-600 hover:to-gray-800 transition-all duration-300 flex items-center"
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
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-600 mx-auto"></div>
                    <p className="mt-4 text-gray-400">
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                        {restaurants.map((restaurant) => (
                          <Link
                            key={restaurant.restaurantId}
                            to={`/restaurants/${restaurant.restaurantId}`}
                            className="block group"
                          >
                            <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 h-52">
                              <div
                                className={`bg-gradient-to-br ${getRandomGradient()} h-32 relative`}
                              >
                                <img
                                  src={`https://picsum.photos/500/300?random=${restaurant.restaurantId}`}
                                  alt={restaurant.restaurantName}
                                  className="object-cover w-full h-full absolute inset-0"
                                />
                              </div>
                              <div className="p-4 h-40 flex flex-col justify-between">
                                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 truncate">
                                  {restaurant.restaurantName}
                                </h3>
                                <p className="text-white opacity-80 truncate">
                                  {restaurant.locality}
                                </p>
                              </div>
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
      <Footer />
    </>
  );
}

export default LocationSearch;
