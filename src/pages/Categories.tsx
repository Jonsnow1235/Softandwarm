import React from 'react';
import { ProductCard } from '../components/product/ProductCard';
import { useCart } from '../hooks/useCart';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';
import { toast } from 'react-hot-toast';

export function Categories() {
  const { addToCart } = useCart();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (data) {
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product, size: string, color: string) => {
    addToCart(product, size, color);
    toast.success('Added to Cart!', {
      position: 'bottom-right',
      className: 'bg-black text-white',
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold mb-8">Our Collection</h1>
      {products.length === 0 ? (
        <div className="text-center text-gray-500">No products available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}