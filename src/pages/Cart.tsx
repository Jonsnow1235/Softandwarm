import React from 'react';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../components/cart/CartItem';
import { CheckoutForm } from '../components/CheckoutForm';

export function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const deliveryFee = 8;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold mb-8">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>{total.toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery:</span>
                <span>{deliveryFee} TND</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>{(total + deliveryFee).toFixed(2)} TND</span>
              </div>
            </div>
          </div>
          
          <CheckoutForm total={total + deliveryFee} />
        </div>
      )}
    </div>
  );
}