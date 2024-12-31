import React from 'react';
import type { Order } from '../../types';
import { format } from 'date-fns';

interface ProcessedOrderListProps {
  orders: Order[];
}

export function ProcessedOrderList({ orders }: ProcessedOrderListProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState<'date' | 'name'>('date');

  const filteredOrders = orders
    .filter(order => 
      order.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone_number.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return a.full_name.localeCompare(b.full_name);
    });

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
          className="rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredOrders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{order.full_name}</h3>
                <p className="text-sm text-gray-500">{order.phone_number}</p>
                <p className="text-sm text-gray-500">{order.address}</p>
              </div>
              <p className="text-sm text-gray-500">
                {format(new Date(order.created_at), 'MMM d, yyyy')}
              </p>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Order Items:</h4>
              <ul className="space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.name} ({item.selectedSize},{' '}
                      <span
                        className="inline-block w-3 h-3 rounded-full align-middle"
                        style={{ backgroundColor: item.selectedColor }}
                      />
                      )
                    </span>
                    <span>{(item.price * item.quantity).toFixed(2)} TND</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between font-medium">
                <span>Total:</span>
                <span>{order.total_cost.toFixed(2)} TND</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}