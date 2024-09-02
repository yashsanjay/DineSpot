
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-4">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black-600 transition-colors duration-300"
      >
        Go Back to Home
      </Link>
    </div>
    <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-wrap justify-between mb-8">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h2 className="text-2xl font-semibold mb-4">About Us</h2>
              <p className="text-gray-400">Discover the best culinary experiences in your area. We provide curated lists of top-rated restaurants to make dining out an unforgettable experience.</p>
            </div>
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
              <ul>
                <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
                <li><Link to="/restaurants" className="text-gray-400 hover:text-white transition">Restaurants</Link></li>
                <li><Link to="/search/location" className="text-gray-400 hover:text-white transition">Location Search</Link></li>
                <li><Link to="/search/image" className="text-gray-400 hover:text-white transition">Image Search</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="www.facebook.com" className="text-gray-400 hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <p className="text-center text-gray-400">&copy; {new Date().getFullYear()} MyRestaurant. All rights reserved.</p>
         
          </div>
        </div>
      </footer>
    </>
  );
};

export default NotFound;
