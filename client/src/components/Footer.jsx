import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const navItems = [
    { to: "/", title: "Home" },
    { to: "/restaurants", title: "Restaurants" },
    { to: "/search/location", title: "Location Search" },
    { to: "/search/image", title: "Image Search" },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com' },
    { name: 'Twitter', icon: Twitter, url: 'https://www.twitter.com' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com' },
    { name: 'Youtube', icon: Youtube, url: 'https://www.youtube.com' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">About Us</h3>
            <p className="text-gray-300 leading-relaxed">
              Discover the best culinary experiences in your area. We provide
              curated lists of top-rated restaurants to make dining out an
              unforgettable experience.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">Quick Links</h3>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">›</span> {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} MyRestaurant. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;