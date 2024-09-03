import React from "react";
import { ChevronRight } from "lucide-react";

const FeaturedDishes = () => {
  const dishes = [
    {
      name: "Sushi Platter",
      image:
        "https://b.zmtcdn.com/data/pictures/3/20127653/22cfc95ccc5701d0aa0b1bb4d76c6bca_o2_featured_v2.jpg",
      description: "Fresh sushi with a variety of flavors.",
      price: "$24.99",
    },
    {
      name: "Pizza Margherita",
      image:
        "https://b.zmtcdn.com/data/pictures/8/21294568/0a23465fe4cdd399df0019d89c7d2493.jpg?fit=around|750:500&crop=750:500;*,*",
      description: "Classic pizza with tomato, mozzarella, and basil.",
      price: "$18.99",
    },
    {
      name: "Spaghetti Carbonara",
      image:
        "https://media.istockphoto.com/id/1065506718/photo/carbonara-pasta-spaghetti-with-pancetta-egg-parmesan-cheese-and-cream-sauce-traditional.jpg?s=612x612&w=0&k=20&c=nGdJRIL75P4SRCDBFbY2_TjZbf_dS5Rqo774c8rkcLc=",
      description: "Creamy pasta with pancetta and parmesan cheese.",
      price: "$16.99",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Dishes
          </h2>
          <p className="text-xl text-gray-300">
            Explore some of the most popular dishes from our featured restaurants
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <div
              key={index}
              className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 w-full">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:opacity-0"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">
                  {dish.name}
                </h3>
                <p className="text-gray-400 mb-4">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">{dish.price}</span>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;