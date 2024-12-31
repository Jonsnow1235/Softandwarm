import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { Product } from '../../types';

interface ProductFormProps {
  onSuccess: (product: Product) => void;
}

export function ProductForm({ onSuccess }: ProductFormProps) {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Get basic product info
      const product = {
        id: crypto.randomUUID(),
        name: formData.get('name') as string,
        price: Number(formData.get('price')),
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        sizes: (formData.get('sizes') as string).split(',').map(s => s.trim()),
        stock_status: formData.get('stockStatus') as 'in_stock' | 'low_stock' | 'out_of_stock',
        
        // Handle colors
        colors: (formData.get('colors') as string).split(',').map(c => c.trim()),
        color_names: (formData.get('colors') as string)
          .split(',')
          .map(c => c.trim())
          .map(hex => ({
            hex,
            name: formData.get(`colorName_${hex}`) as string || hex
          })),
        
        // Handle images
        images: Array.from(formData.getAll('images') as File[])
          .map((file, index) => ({
            url: `/images/${file.name}`,
            color: (formData.get('colors') as string).split(',')[index].trim(),
            isPrimary: index === 0
          }))
      };

      await onSuccess(product);
      e.currentTarget.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Product Name"
        name="name"
        required
      />
      
      <Input
        label="Price (TND)"
        name="price"
        type="number"
        step="0.01"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        />
      </div>

      <Input
        label="Category"
        name="category"
        required
      />

      <Input
        label="Sizes (comma-separated, e.g: S, M, L, XL)"
        name="sizes"
        required
      />

      <Input
        label="Colors (comma-separated hex codes, e.g: #000000, #FFFFFF)"
        name="colors"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <p className="text-sm text-gray-500 mb-2">Upload one image per color, in the same order as colors</p>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          required
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Stock Status</label>
        <select
          name="stockStatus"
          defaultValue="in_stock"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        >
          <option value="in_stock">In Stock</option>
          <option value="low_stock">Low Stock</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>

      <Button type="submit" isLoading={loading}>
        Add Product
      </Button>
    </form>
  );
}