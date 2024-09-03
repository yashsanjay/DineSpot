import React from "react";
import { Loader as LoaderIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex items-center justify-center">
      <div className="max-w-7xl w-full mx-auto">
        <div className="text-center mb-12">
          <LoaderIcon className="w-16 h-16 text-indigo-500 animate-spin mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Loading Restaurants
          </h2>
          <p className="text-xl text-gray-400">
            Discovering culinary delights near you...
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse"
            >
              <div className="w-full h-48 bg-gray-700"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-700 rounded-full w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded-full"></div>
                  <div className="h-4 bg-gray-700 rounded-full w-5/6"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-8 bg-gray-700 rounded-full w-16"></div>
                  <div className="h-8 bg-gray-700 rounded-full w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;