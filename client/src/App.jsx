import React from "react";
import { Link } from "react-router-dom";
import imgLink from "./assets/se.png";
import FeaturedRestaurants from "./components/FeaturedRestaurants";
import FeaturedDishes from "./components/FeaturedDishes";

function App() {
  return (
    <div className="bg-gray-100 ">
      <div className="max-w-screen-xl mx-auto p-6">
        <div
          className="relative rounded-2xl p-10 w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png)",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-2xl"></div>
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-slate-300 mb-4">
                Discover Culinary Delights Near You
              </h1>
              <p className="text-white text-lg">
                Explore the finest restaurants and dishes in your area
              </p>
            </div>
            <nav className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  to: "/restaurants",
                  title: "Restaurant List",
                  icon: "https://cdn-icons-png.flaticon.com/512/1376/1376387.png",
                  color: "from-red-400 to-red-600",
                },
                {
                  to: "/search/location",
                  title: "Location Search",
                  icon: "https://media.lordicon.com/icons/system/solid/42-search.svg",
                  color: "from-purple-400 to-purple-600",
                },
                {
                  to: "/search/image",
                  title: "Image Search",
                  icon: imgLink,
                  color: "from-green-400 to-green-600",
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className="group bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div
                    className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${item.color} p-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-full h-full object-contain filter invert"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-200 text-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-300">
                    {item.title}
                  </h2>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto p-6">
        <FeaturedRestaurants />
        <FeaturedDishes />
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
    </div>
  );
}

export default App;
