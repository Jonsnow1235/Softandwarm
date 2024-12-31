import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product, ProductImage } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = React.useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  // Filter images for the selected color
  const colorImages = product.images.filter(img => img.color === selectedColor);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % colorImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + colorImages.length) % colorImages.length);
  };

  return (
    <div className="group bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-w-4 aspect-h-5">
        <img
          src={colorImages[currentImageIndex]?.url}
          alt={product.name}
          className="w-full h-full object-cover object-center"
        />
        
        {colorImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.price} TND</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Size:</label>
            <div className="mt-1 flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200
                    ${selectedSize === size 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Color:</label>
            <div className="mt-1 flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setCurrentImageIndex(0);
                  }}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200
                    ${selectedColor === color ? 'border-black scale-110' : 'border-transparent hover:scale-105'}`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => onAddToCart(product, selectedSize, selectedColor)}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}