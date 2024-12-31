import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { supabase } from '../lib/supabase';
import { ColorPicker } from '../components/product/ColorPicker';
import { SizePicker } from '../components/product/SizePicker';
import { Button } from '../components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { Product } from '../types';

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = React.useState<string>('');
  const [selectedColor, setSelectedColor] = React.useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (data) {
          setProduct(data);
          setSelectedSize(data.sizes[0]);
          setSelectedColor(data.colors[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  const colorImages = product.images.filter(img => img.color === selectedColor);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % colorImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + colorImages.length) % colorImages.length);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    toast.success('Added to cart!');
  };

  const colorName = product.color_names.find(c => c.hex === selectedColor)?.name || selectedColor;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="relative aspect-w-3 aspect-h-4">
            <img
              src={colorImages[currentImageIndex]?.url}
              alt={`${product.name} - ${colorName}`}
              className="w-full h-full object-cover rounded-lg"
            />
            {colorImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif font-bold">{product.name}</h1>
              <p className="mt-2 text-xl">{product.price} TND</p>
            </div>

            <p className="text-gray-600">{product.description}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <SizePicker
                  sizes={product.sizes}
                  selectedSize={selectedSize}
                  onChange={setSelectedSize}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color: {colorName}
                </label>
                <ColorPicker
                  colors={product.colors}
                  selectedColor={selectedColor}
                  onChange={setSelectedColor}
                />
              </div>
            </div>

            <Button onClick={handleAddToCart} className="w-full">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}