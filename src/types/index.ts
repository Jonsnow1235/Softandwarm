export interface ProductImage {
  url: string;
  color: string;
  isPrimary: boolean;
}

export interface ColorInfo {
  hex: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  discount_price?: number | null;
  description: string;
  images: ProductImage[];
  sizes: string[];
  colors: string[];
  color_names: ColorInfo[];
  category: string;
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
  created_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  full_name: string;
  phone_number: string;
  address: string;
  items: CartItem[];
  total_cost: number;
  processed: boolean;
  created_at: string;
}