import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdImageSearch ,MdSearch } from "react-icons/md";
import { IoCloudUpload } from "react-icons/io5";
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
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-4 md:p-8">
        <div className="max-w-full mt-32 md:max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-black p-6 md:p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center">

              Search Restaurants by Image
            </h2>
            <p className="text-base md:text-lg text-gray-400">
              Upload an image to find similar restaurants
            </p>
          </div>

          <div className="p-4 md:p-8 bg-gray-900 ">
            <div className="flex flex-col items-center border-2 border-dotted rounded-xl p-3  mb-6">
              <label
                htmlFor="imageUpload"
                className="cursor-pointer flex flex-col items-center"
              >
                <IoCloudUpload className="text-6xl text-gray-400 mb-4" />
                <span className="text-lg text-gray-600 hover:text-gray-300">
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
              <p className="text-center text-gray-300 mb-4">
                Selected Image: {imageName}
              </p>
            )}

            <button
              onClick={handleSearch}
              disabled={!image || isLoading}
              className={`w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-3 rounded-lg font-semibold text-lg flex items-center justify-center transition-transform transform hover:scale-105 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <MdSearch className="animate-spin mr-2" />
              ) : (
                <MdSearch className="mr-2" />
              )}
              {isLoading ? "Searching..." : "Search"}
            </button>

            {error && (
              <p className="mt-6 text-center text-red-500 font-medium">
                {error}
              </p>
            )}

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-600 mx-auto"></div>
                <p className="mt-4 text-gray-400">
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
                              {restaurant.cuisines}
                            </p>
                          </div>
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
      <Footer />
    </>
  );
}

export default ImageSearch;
