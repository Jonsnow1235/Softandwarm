import React from 'react';
import { Button } from '../ui/Button';

interface OrderListProps {
  orders: any[];
  onUpdateStatus: (id: string) => void;
}

export function OrderList({ orders, onUpdateStatus }: OrderListProps) {
  if (orders.length === 0) {
    return <div className="text-center text-gray-500">No orders yet</div>;
  }

  return (
    <div className="space-y-6">
      {orders.map(order => (
        <div
          key={order.id}
          className="bg-white rounded-lg shadow-sm p-6 space-y-4"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{order.full_name}</h3>
              <p className="text-sm text-gray-500">{order.phone_number}</p>
              <p className="text-sm text-gray-500">{order.address}</p>
            </div>
            {!order.processed && (
              <Button onClick={() => onUpdateStatus(order.id)}>
                Mark as Processed
              </Button>
            )}
            {order.processed && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Processed
              </span>
            )}
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Order Items:</h4>
            <ul className="space-y-2">
              {order.items.map((item: any, index: number) => (
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
  );
}