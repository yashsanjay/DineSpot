import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { Search } from 'lucide-react';


function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [inputPage, setInputPage] = useState("");

  // Local state to hold filter inputs
  const [filterInputs, setFilterInputs] = useState({
    city: "",
    averageSpend: "",
    cuisines: "",
  });

  // State to hold applied filters
  const [filters, setFilters] = useState({
    city: "",
    averageSpend: "",
    cuisines: "",
  });

  // State to hold cities and cuisines
  const [cities, setCities] = useState([]);
  const [cuisines, setCuisines] = useState([]);

  // State to manage dropdown visibility
  const [cityDropdownVisible, setCityDropdownVisible] = useState(false);
  const [cuisineDropdownVisible, setCuisineDropdownVisible] = useState(false);

  // Fetch restaurants and filters
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const citiesResponse = await axios.get(
          "https://zomato-like-gx27.onrender.com/restaurants/cities"
        );
        const cuisinesResponse = await axios.get(
          "https://zomato-like-gx27.onrender.com/restaurants/cuisines"
        );
        console.log("Cities response:", citiesResponse.data); // Log the response
        console.log("Cuisines response:", cuisinesResponse.data); // Log the response

        setCities(citiesResponse.data);
        setCuisines(cuisinesResponse.data);
      } catch (error) {
        console.error("Error fetching cities or cuisines:", error);
      }
    };

    fetchFilters();

    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://zomato-like-gx27.onrender.com/restaurants?page=${page}&limit=${limit}`,
          {
            params: filters,
          }
        );
        setRestaurants(response.data.restaurants);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [page, limit, filters]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      setInputPage("");
    }
  };

  const handleFilterInputChange = (e) => {
    const { name, value } = e.target;
    setFilterInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleCitySelect = (city) => {
    setFilterInputs((prevInputs) => ({
      ...prevInputs,
      city: city,
    }));
    setFilters((prevFilters) => ({
      ...prevFilters,
      city: city,
    }));
    setCityDropdownVisible(false);
  };

  const handleCuisineSelect = (cuisine) => {
    setFilterInputs((prevInputs) => ({
      ...prevInputs,
      cuisines: cuisine,
    }));
    setFilters((prevFilters) => ({
      ...prevFilters,
      cuisines: cuisine,
    }));
    setCuisineDropdownVisible(false);
  };

  const applyFilters = () => {
    setFilters(filterInputs);
    setPage(1); // Reset to the first page when applying filters
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(filterInputs.city.toLowerCase())
  );
  const filteredCuisines = cuisines.filter((cuisine) =>
    cuisine.toLowerCase().includes(filterInputs.cuisines.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen py-28 bg-gradient-to-br from-gray-900 to-black p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">
            Discover Local Flavors
          </h2>

          <div className=" text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">
          Filters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <label htmlFor="city" className="block text-lg font-semibold text-gray-300">City</label>
            <div className="relative">
              <input
                type="text"
                id="city"
                name="city"
                value={filterInputs.city}
                onChange={handleFilterInputChange}
                onClick={handleFilterInputChange}
                onFocus={() => setCityDropdownVisible(true)}
                onBlur={() => setTimeout(() => setCityDropdownVisible(false), 200)}
                placeholder="Filter by City"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {cityDropdownVisible && (
                <div className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-lg mt-1 max-h-40 overflow-y-auto">
                  {filteredCities.length > 0 && (
                    <ul>
                      {filteredCities.map((city, index) => (
                        <li
                          key={index}
                          onClick={() => handleCitySelect(city)}
                          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                        >
                          {city}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <label htmlFor="averageSpend" className="block text-lg font-semibold text-gray-300">Average Spend</label>
            <input
              type="number"
              id="averageSpend"
              name="averageSpend"
              value={filterInputs.averageSpend}
              onChange={handleFilterInputChange}
              placeholder="Filter by Average Spend"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="cuisines" className="block text-lg font-semibold text-gray-300">Cuisines</label>
            <div className="relative">
              <input
                type="text"
                id="cuisines"
                name="cuisines"
                value={filterInputs.cuisines}
                onChange={handleFilterInputChange}
                onClick={handleFilterInputChange}
                onFocus={() => setCuisineDropdownVisible(true)}
                onBlur={() => setTimeout(() => setCuisineDropdownVisible(false), 200)}
                placeholder="Filter by Cuisines (comma separated)"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {cuisineDropdownVisible && (
                <div className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-lg mt-1 max-h-40 overflow-y-auto">
                  {filteredCuisines.length > 0 && (
                    <ul>
                      {filteredCuisines.map((cuisine, index) => (
                        <li
                          key={index}
                          onClick={() => handleCuisineSelect(cuisine)}
                          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                        >
                          {cuisine}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={applyFilters}
          className="mt-8 px-6 py-3 flex items-center justify-center text-white bg-gradient-to-r from-indigo-400 to-pink-500 rounded-full hover:from-indigo-500 hover:to-pink-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          <Search className="w-5 h-5 mr-2" />
          Apply Filters
        </button>
      </div>
    </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {restaurants.map((restaurant) => (
                  <Link
                    key={restaurant.restaurantId}
                    to={`/restaurants/${restaurant.restaurantId}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                      <div className="relative h-64">
                        <img
                          src={`https://picsum.photos/500/300?random=${restaurant.restaurantId}`}
                          alt={restaurant.restaurantName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 transition-transform duration-300 group-hover:translate-y-0">
                          <h3 className="text-2xl font-bold mb-2">
                            {restaurant.restaurantName}
                          </h3>
                          <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Click to explore menu and details
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-12 flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="mt-4 px-6 py-3 text-white bg-indigo-400 bg-gradient-to-r from-indigo-400 to-pink-800 rounded-full hover:bg-indigo-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    Previous Page
                  </button>
                  <span className="text-lg font-medium text-white">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="mt-4 px-6 py-3 text-white bg-indigo-400 bg-gradient-to-r from-indigo-400 to-pink-800 rounded-full hover:bg-indigo-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    Next Page
                  </button>
                </div>
                <div className="mt-4">
                  <input
                    type="number"
                    value={inputPage}
                    onChange={(e) => setInputPage(e.target.value)}
                    placeholder="Go to page"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <button
                    onClick={() => handlePageChange(Number(inputPage))}
                    className="mt-4 px-6 py-3 text-white bg-indigo-400 bg-gradient-to-r from-indigo-400 to-pink-800 rounded-full hover:bg-indigo-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    Go
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RestaurantList;
