import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="relative">
      <div className="h-screen relative">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-center">
            Elegance Meets Comfort
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-center max-w-2xl">
            Discover our collection of premium comfort wear, designed for the modern woman who values both style and comfort.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              to="/categories"
              className="bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors duration-300"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-black transition-colors duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}