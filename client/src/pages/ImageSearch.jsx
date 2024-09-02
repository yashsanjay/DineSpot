import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch, FaFileImage, FaSpinner } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";

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

function ImageSearch() {
  const [image, setImage] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageName, setImageName] = useState("");
  const [searchMade, setSearchMade] = useState(false);

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImageName(selectedImage.name);
  };

  const handleSearch = async () => {
    if (!image) {
      setError("Please select an image");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchMade(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://zomato-like-gx27.onrender.com/restaurants/search/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setRestaurants(response.data);
    } catch (err) {
      console.error(err);
      setError("An error occurred while searching for restaurants.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [image]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
        <div className="max-w-full md:max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 md:p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              Search Restaurants by Image
            </h2>
          </div>

          <div className="p-4 md:p-8">
            <div className="flex items-center justify-center mb-6">
              <label
                htmlFor="imageUpload"
                className="cursor-pointer flex flex-col items-center"
              >
                <FaFileImage className="text-6xl text-gray-400 mb-4" />
                <span className="text-lg text-gray-600 hover:text-gray-800">
                  Upload an image
                </span>
                <input
                  id="imageUpload"
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
            {imageName && (
              <p className="text-center text-gray-700 mb-4">
                Selected Image: {imageName}
              </p>
            )}
            <button
              onClick={handleSearch}
              disabled={!image || isLoading}
              className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg flex items-center justify-center transition-transform transform hover:scale-105 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaSearch className="mr-2" />
              )}
              {isLoading ? "Searching..." : "Search"}
            </button>
            {error && (
              <p className="mt-6 text-center text-red-600 font-medium">
                {error}
              </p>
            )}

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">
                  Searching for restaurants...
                </p>
              </div>
            ) : (
              <div className="mt-8">
                {searchMade && restaurants.length === 0 ? (
                  <p className="text-gray-500 text-center py-12">
                    No restaurants found for the selected image.
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
                            {restaurant.cuisines}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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

export default ImageSearch;
