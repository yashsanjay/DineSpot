
import React from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Camera, ChevronRight } from "lucide-react";
import FeaturedRestaurants from "./components/FeaturedRestaurants";
import FeaturedDishes from "./components/FeaturedDishes";
import Footer from "./components/Footer";

const App = () => {
  const navItems = [
    { to: "/restaurants", title: "Restaurant List", icon: Search },
    { to: "/search/location", title: "Location Search", icon: MapPin },
    { to: "/search/image", title: "Image Search", icon: Camera },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen">
     

      <main>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">
                Discover Culinary Delights
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Explore the finest restaurants and dishes in your area
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group bg-gray-800 bg-opacity-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex items-center justify-center mb-4">
                    <item.icon className="w-10 h-10 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                    {item.title}
                  </h2>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    Explore now
                  </p>
                  <ChevronRight className="w-6 h-6 mt-4 mx-auto text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FeaturedRestaurants />
        <FeaturedDishes />
      </main>

      <Footer/>
    </div>
  );
};

export default App;