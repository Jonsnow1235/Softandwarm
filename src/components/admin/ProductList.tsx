import React from 'react';
import type { Product } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Trash2, Edit, X } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onUpdatePrice: (id: string, newPrice: number) => void;
  onUpdateProduct: (id: string, updates: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
}

export function ProductList({ products, onUpdatePrice, onUpdateProduct, onDeleteProduct }: ProductListProps) {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editingProduct, setEditingProduct] = React.useState<Partial<Product>>({});

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditingProduct(product);
  };

  const handleSave = async (id: string) => {
    await onUpdateProduct(id, editingProduct);
    setEditingId(null);
    setEditingProduct({});
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium">Products ({products.length})</h2>
      <div className="grid gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-sm">
            {editingId === product.id ? (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Input
                    value={editingProduct.name || product.name}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev, name: e.target.value }))}
                    className="font-medium text-lg"
                  />
                  <Button
                    variant="secondary"
                    onClick={() => setEditingId(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Regular Price (TND)"
                    type="number"
                    value={editingProduct.price || product.price}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                  />
                  <Input
                    label="Discount Price (TND)"
                    type="number"
                    value={editingProduct.discount_price || product.discount_price || ''}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev, discount_price: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock Status</label>
                  <select
                    value={editingProduct.stock_status || product.stock_status}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev, stock_status: e.target.value as any }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>

                <Button onClick={() => handleSave(product.id)}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => onDeleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <p className="text-gray-600">
                      Price: {product.price} TND
                      {product.discount_price && (
                        <span className="ml-2 text-red-500">
                          Discount: {product.discount_price} TND
                        </span>
                      )}
                    </p>
                    <p className={`text-sm ${
                      product.stock_status === 'out_of_stock' 
                        ? 'text-red-500' 
                        : product.stock_status === 'low_stock' 
                        ? 'text-yellow-500' 
                        : 'text-green-500'
                    }`}>
                      {product.stock_status.replace('_', ' ').toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}