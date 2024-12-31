import React from 'react';

export function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif font-bold mb-8 text-center">Our Story</h1>
      <div className="prose prose-lg mx-auto">
        <p className="text-lg leading-relaxed mb-6">
          Founded with a passion for combining comfort with elegance, Soft&Warm emerged 
          from a simple idea: that clothing should feel as good as it looks. Our journey 
          began with the belief that women shouldn't have to choose between style and comfort.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Every piece in our collection is thoughtfully designed to embrace both luxury 
          and practicality. We carefully select premium materials that provide the perfect 
          balance of softness and durability, ensuring that each garment becomes a 
          cherished part of your wardrobe.
        </p>
        <p className="text-lg leading-relaxed">
          At Soft&Warm, we're more than just a clothing brand – we're a commitment to 
          your everyday comfort and confidence. Join us in redefining elegant comfort 
          wear for the modern woman.
        </p>
      </div>
    </div>
  );
}