import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        <div className="text-2xl font-bold text-gray-800">
          <Link to="/" className="hover:text-gray-600">
            <span className="text-red-600">My</span><span className="text-white">Restaurant</span>
          </Link>
        </div>


        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-900 transition-colors duration-300">Home</Link>
          <Link to="/restaurants" className="text-white hover:text-gray-900 transition-colors duration-300">Restaurants</Link>
          <Link to="/search/location" className="text-white hover:text-gray-900 transition-colors duration-300">Search</Link>
        </div>


        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>


      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col space-y-4 py-4 px-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Home</Link>
          <Link to="/restaurants" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Restaurants</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
