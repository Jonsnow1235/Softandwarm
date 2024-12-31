import React from 'react';
import { ProductForm } from '../components/admin/ProductForm';
import { ProductList } from '../components/admin/ProductList';
import { OrderList } from '../components/admin/OrderList';
import { supabase } from '../lib/supabase';
import { createProduct, updateProduct, deleteProduct } from '../lib/products';
import type { Product } from '../types';
import { toast } from 'react-hot-toast';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = React.useState<'products' | 'orders'>('products');
  const [products, setProducts] = React.useState<Product[]>([]);
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        // Fetch products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (productsError) throw productsError;
        setProducts(productsData || []);

        // Fetch all orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;
        setOrders(ordersData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Subscribe to realtime orders
    const ordersSubscription = supabase
      .channel('custom-orders-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          setOrders(prev => [payload.new, ...prev]);
          toast.success('New order received!');
        }
      )
      .subscribe();

    return () => {
      ordersSubscription.unsubscribe();
    };
  }, []);

  const handleAddProduct = async (product: Product) => {
    try {
      const newProduct = await createProduct(product);
      setProducts(prev => [newProduct, ...prev]);
      toast.success('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    }
  };

  const handleUpdateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const updatedProduct = await updateProduct(id, updates);
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleUpdateOrderStatus = async (id: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ processed: true })
        .eq('id', id);

      if (error) throw error;
      
      setOrders(prev => prev.map(order => 
        order.id === id ? { ...order, processed: true } : order
      ));
      toast.success('Order marked as processed!');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order status');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
        <div className="mt-4 border-b">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Orders
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'products' ? (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium mb-4">Add New Product</h2>
            <ProductForm onSuccess={handleAddProduct} />
          </div>
          
          <ProductList 
            products={products}
            onUpdatePrice={(id, price) => handleUpdateProduct(id, { price })}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </div>
      ) : (
        <OrderList 
          orders={orders}
          onUpdateStatus={handleUpdateOrderStatus}
        />
      )}
    </div>
  );
}