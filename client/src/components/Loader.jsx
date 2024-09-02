import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
      <div className="max-w-6xl mx-auto p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          Restaurant List
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden animate-pulse"
            >
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
