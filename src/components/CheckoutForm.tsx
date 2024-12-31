import React from 'react';
import { toast } from 'react-hot-toast';
import { useCart } from '../hooks/useCart';
import { supabase } from '../lib/supabase';

interface CheckoutFormProps {
  total: number;
}

export function CheckoutForm({ total }: CheckoutFormProps) {
  const { items, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const orderData = {
      full_name: formData.get('fullName') as string,
      phone_number: formData.get('phone') as string,
      address: formData.get('address') as string,
      items,
      total_cost: total,
      processed: false
    };

    try {
      const { error } = await supabase
        .from('orders')
        .insert([orderData]);

      if (error) throw error;

      toast.success('Order placed successfully!');
      clearCart();
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-medium mb-4">Checkout</h2>
      
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        />
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Delivery Address
        </label>
        <textarea
          id="address"
          name="address"
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
      >
        {isSubmitting ? 'Processing...' : `Place Order • ${total.toFixed(2)} TND`}
      </button>
    </form>
  );
}