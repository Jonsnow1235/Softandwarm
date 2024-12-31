import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, ShoppingCart } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="font-serif text-2xl font-bold">
            Soft&Warm
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-900 hover:text-gray-600 transition">
              Home
            </Link>
            <Link to="/categories" className="text-gray-900 hover:text-gray-600 transition">
              Categories
            </Link>
            <Link to="/about" className="text-gray-900 hover:text-gray-600 transition">
              About Us
            </Link>
            <a
              href="https://www.instagram.com/softandwarm_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-gray-600 transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <Link to="/cart" className="text-gray-900 hover:text-gray-600 transition">
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>

          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}