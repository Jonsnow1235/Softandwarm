import React from 'react';
import { X, Minus, Plus } from 'lucide-react';
import type { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onRemove: (item: CartItemType) => void;
  onUpdateQuantity: (item: CartItemType, quantity: number) => void;
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <img
        src={item.images[0]}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">
          Size: {item.selectedSize} | Color: 
          <span 
            className="inline-block w-3 h-3 rounded-full ml-1 align-middle"
            style={{ backgroundColor: item.selectedColor }}
          />
        </p>
        <p className="font-medium">{item.price} TND</p>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item, Math.max(1, item.quantity - 1))}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item, item.quantity + 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <button
        onClick={() => onRemove(item)}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}