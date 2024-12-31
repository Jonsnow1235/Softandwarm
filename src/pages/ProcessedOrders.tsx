import React from 'react';
import { supabase } from '../lib/supabase';
import { ProcessedOrderList } from '../components/admin/ProcessedOrderList';
import { toast } from 'react-hot-toast';
import type { Order } from '../types';

export function ProcessedOrders() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProcessedOrders() {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('processed', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching processed orders:', error);
        toast.error('Failed to load processed orders');
      } finally {
        setLoading(false);
      }
    }

    fetchProcessedOrders();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold mb-8">Processed Orders</h1>
      <ProcessedOrderList orders={orders} />
    </div>
  );
}