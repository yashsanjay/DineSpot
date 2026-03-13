import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Map from "../components/Map";
import { MapPin, Utensils, DollarSign, Star, ThumbsUp } from "lucide-react";
import Footer from "../components/Footer";

const UNSPLASH_ACCESS_KEY = "xxCNDNbKS_AQt6tXxmfP3n79P0Ae_PSqA_nnJTTGtis";
const API_BASE_URL = "https://zomato-like-gx27.onrender.com";

function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/restaurants/${id}`);
        setRestaurant(response.data);

        const imageResponse = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query: response.data.cuisines.toLowerCase(),
              per_page: 1,
            },
            headers: {
              Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
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

  const submitRating = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login to rate this restaurant.");
      return;
    }

    if (!rating) {
      alert("Please select a rating");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/restaurants/${id}/rate`,
        {
          userId,
          rating,
        }
      );

      alert(response.data.message);

      setRestaurant((prev) => ({
        ...prev,
        averageRating: response.data.averageRating,
      }));

      setRating("");
    } catch (error) {
      console.error(error);
      alert("Error submitting rating");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-xl text-gray-400">
            Loading delicious details...
          </p>
        </div>
      </div>
    );
  }

  const displayedAverageRating =
    restaurant.averageRating && restaurant.averageRating > 0
      ? restaurant.averageRating.toFixed(1)
      : "No ratings yet";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-b from-gray-900 to-black rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative h-96">
            <img
              src={image || "https://via.placeholder.com/1200x600"}
              alt={restaurant.restaurantName}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
              <div className="p-8">
                <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2">
                  {restaurant.restaurantName}
                </h2>

                <p className="text-xl text-gray-400">{restaurant.cuisines}</p>

                <p className="text-lg mt-2 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  Average Rating: {displayedAverageRating}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: MapPin,
                  title: "Address",
                  value: `${restaurant.address}, ${restaurant.city}`,
                },
                {
                  icon: MapPin,
                  title: "Locality",
                  value: restaurant.locality,
                },
                {
                  icon: Utensils,
                  title: "Cuisines",
                  value: restaurant.cuisines,
                },
                {
                  icon: DollarSign,
                  title: "Average Cost for Two",
                  value: `${restaurant.currency} ${restaurant.averageCostForTwo}`,
                },
                {
                  icon: DollarSign,
                  title: "Price Range",
                  value: restaurant.priceRange,
                },
                {
                  icon: Star,
                  title: "Dataset Rating",
                  value: `${restaurant.aggregateRating} (${restaurant.ratingText})`,
                },
                {
                  icon: ThumbsUp,
                  title: "Votes",
                  value: restaurant.votes,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-700 rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <item.icon className="h-8 w-8 mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    {item.title}
                  </h3>
                  <p className="text-lg text-gray-400">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-3xl font-semibold mb-4">
                Rate this Restaurant
              </h3>

              <div className="flex items-center space-x-3">
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded-lg p-2"
                >
                  <option value="">Select rating</option>
                  <option value="1">1 ⭐</option>
                  <option value="2">2 ⭐</option>
                  <option value="3">3 ⭐</option>
                  <option value="4">4 ⭐</option>
                  <option value="5">5 ⭐</option>
                </select>

                <button
                  onClick={submitRating}
                  className="bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600"
                >
                  Submit Rating
                </button>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6">
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

      <Footer />
    </div>
  );
}

export default RestaurantDetail;