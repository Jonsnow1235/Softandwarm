import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProductImage } from '../../types';

interface ImageGalleryProps {
  images: ProductImage[];
  selectedColor: string;
  productName: string;
  colorName: string;
}

export function ImageGallery({ images, selectedColor, productName, colorName }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isZoomed, setIsZoomed] = React.useState(false);
  
  const colorImages = images.filter(img => img.color === selectedColor);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % colorImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + colorImages.length) % colorImages.length);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="relative">
      <div 
        className={`relative aspect-w-3 aspect-h-4 cursor-zoom-in transition-transform duration-300 ${
          isZoomed ? 'scale-150' : ''
        }`}
        onClick={toggleZoom}
      >
        <img
          src={colorImages[currentIndex]?.url}
          alt={`${productName} - ${colorName}`}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {colorImages.length > 1 && !isZoomed && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {colorImages.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {colorImages.map((image, index) => (
            <button
              key={image.url}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-20 h-20 rounded-md overflow-hidden ${
                index === currentIndex ? 'ring-2 ring-black' : ''
              }`}
            >
              <img
                src={image.url}
                alt={`${productName} - ${colorName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}