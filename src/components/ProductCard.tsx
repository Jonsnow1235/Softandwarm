import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = React.useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]);

  return (
    <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div className="aspect-w-4 aspect-h-5">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{product.price} TND</p>
        
        <div className="mt-3">
          <label className="text-sm font-medium text-gray-700">Size:</label>
          <div className="mt-1 flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-1 text-sm rounded ${
                  selectedSize === size
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <label className="text-sm font-medium text-gray-700">Color:</label>
          <div className="mt-1 flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color ? 'border-black' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => onAddToCart(product, selectedSize, selectedColor)}
          className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}