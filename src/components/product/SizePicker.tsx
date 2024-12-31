import React from 'react';

interface SizePickerProps {
  sizes: string[];
  selectedSize: string;
  onChange: (size: string) => void;
}

export function SizePicker({ sizes, selectedSize, onChange }: SizePickerProps) {
  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          className={`
            px-3 py-1 rounded text-sm font-medium transition-colors duration-200
            ${selectedSize === size 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
          `}
        >
          {size}
        </button>
      ))}
    </div>
  );
}