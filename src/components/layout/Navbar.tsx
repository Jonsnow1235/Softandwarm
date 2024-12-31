import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export function Navbar() {
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="font-serif text-2xl font-bold">
            Soft&Warm
          </Link>
          
          {/* Desktop Navigation */}
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
            <Link to="/cart" className="text-gray-900 hover:text-gray-600 transition relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <a
              href="https://www.instagram.com/softandwarm_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <Link to="/cart" className="text-gray-900 relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}