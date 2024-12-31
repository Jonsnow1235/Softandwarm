import React from 'react';

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ colors, selectedColor, onChange }: ColorPickerProps) {
  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onChange(color)}
          className={`
            w-6 h-6 rounded-full border-2 transition-all duration-200
            ${selectedColor === color ? 'border-black scale-110' : 'border-transparent hover:scale-105'}
          `}
          style={{ backgroundColor: color }}
          aria-label={`Select color ${color}`}
        />
      ))}
    </div>
  );
}