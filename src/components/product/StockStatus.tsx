import React from 'react';

interface StockStatusProps {
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export function StockStatus({ status }: StockStatusProps) {
  const statusConfig = {
    in_stock: {
      text: 'In Stock',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    low_stock: {
      text: 'Low Stock',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    out_of_stock: {
      text: 'Out of Stock',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} ${config.bgColor}`}>
      {config.text}
    </span>
  );
}