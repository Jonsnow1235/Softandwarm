import React from 'react';
import type { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = React.createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);

  const addToCart = (product: Product, size: string, color: string) => {
    setItems(prev => {
      const existingItem = prev.find(
        item => 
          item.id === product.id && 
          item.selectedSize === size && 
          item.selectedColor === color
      );

      if (existingItem) {
        return prev.map(item => 
          item === existingItem
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (item: CartItem) => {
    setItems(prev => prev.filter(i => i !== item));
  };

  const updateQuantity = (item: CartItem, quantity: number) => {
    setItems(prev => 
      prev.map(i => i === item ? { ...i, quantity } : i)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
  };

  return React.createElement(CartContext.Provider, { value }, children);
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}