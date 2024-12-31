import type { Product } from '../types';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Cropped Hoodie',
    price: 55,
    description:
      'Stylish and comfortable cropped hoodie perfect for any casual occasion.',
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#F5F5DC', '#FFFFFF'],
    color_names: [
      { hex: '#000000', name: 'Black' },
      { hex: '#F5F5DC', name: 'Beige' },
      { hex: '#FFFFFF', name: 'White' },
    ],
    stock_status: 'in_stock',
    images: [
      {
        url: '/images/croppedhoodie-black.jpg',
        color: '#000000',
        isPrimary: true,
      },
      {
        url: '/images/croppedhoodie-beige.jpg',
        color: '#F5F5DC',
        isPrimary: false,
      },
      {
        url: '/images/croppedhoodie-white.jpg',
        color: '#FFFFFF',
        isPrimary: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Crop Top',
    price: 32,
    description: 'Essential crop top that combines style with comfort.',
    category: 'Tops',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#F5F5DC'],
    color_names: [
      { hex: '#000000', name: 'Black' },
      { hex: '#F5F5DC', name: 'Beige' },
    ],
    stock_status: 'in_stock',
    images: [
      { url: '/images/croptop-black.jpg', color: '#000000', isPrimary: true },
      { url: '/images/croptop-beige.jpg', color: '#F5F5DC', isPrimary: false },
    ],
  },
  {
    id: '3',
    name: 'Blanket Hoodie',
    price: 89,
    description: 'Ultra-comfortable blanket hoodie perfect for cozy days.',
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#F5F5DC', '#FFC0CB', '#87CEEB'],
    color_names: [
      { hex: '#000000', name: 'Black' },
      { hex: '#F5F5DC', name: 'Beige' },
      { hex: '#FFC0CB', name: 'Pink' },
      { hex: '#87CEEB', name: 'Blue' },
    ],
    stock_status: 'in_stock',
    images: [
      { url: '/images/blanket-black.jpg', color: '#000000', isPrimary: true },
      { url: '/images/blanket-beige.jpg', color: '#F5F5DC', isPrimary: false },
      { url: '/images/blanket-pink.jpg', color: '#FFC0CB', isPrimary: false },
      { url: '/images/blanket-blue.jpg', color: '#87CEEB', isPrimary: false },
    ],
  },
  {
    id: '4',
    name: 'Wide Leg Pants',
    price: 62,
    description: 'Elegant wide leg pants for a sophisticated look.',
    category: 'Pants',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000'],
    color_names: [
      { hex: '#000000', name: 'Black' },
      { hex: '#FFFFFF', name: 'white' }
      
    ],
    stock_status: 'in_stock',
    images: [
      { url: '/images/widepants-black.jpg', color: '#000000', isPrimary: true },
      { url: '/images/widepants-white.jpg', color: '#000000', isPrimary: true }

    ],
  },
  {
    id: '5',
    name: 'Cropped Zip-Up',
    price: 49,
    description: 'Versatile cropped zip-up perfect for layering.',
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#F5F5DC', '#FFFFFF'],
    color_names: [
      { hex: '#000000', name: 'Black' },
      { hex: '#F5F5DC', name: 'Beige' },
      { hex: '#FFFFFF', name: 'White' },
    ],
    stock_status: 'in_stock',
    images: [
      { url: '/images/zipup-black.jpg', color: '#000000', isPrimary: true },
      { url: '/images/zipup-beige.jpg', color: '#F5F5DC', isPrimary: false },
      { url: '/images/zipup-white.jpg', color: '#FFFFFF', isPrimary: false },
    ],
  },
  {
    id: '6',
    name: 'Sweat Pants',
    price: 59,
    description: 'Comfortable and stylish sweat pants for everyday wear.',
    category: 'Pants',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#F5F5DC', '#FFFFFF'],
    color_names: [
      { hex: '#000000', name: 'Black' },
      { hex: '#F5F5DC', name: 'Beige' },
      { hex: '#FFFFFF', name: 'White' },
    ],
    stock_status: 'in_stock',
    images: [
      {
        url: '/images/sweatpants-black.jpg',
        color: '#000000',
        isPrimary: true,
      },
      {
        url: '/images/sweatpants-beige.jpg',
        color: '#F5F5DC',
        isPrimary: false,
      },
      {
        url: '/images/sweatpants-white.jpg',
        color: '#FFFFFF',
        isPrimary: false,
      },
    ],
  },
  {
    id: '7',
    name: 'Striped Oversized Shirt',
    price: 45,
    description:
      'Classic striped oversized shirt for a casual yet put-together look.',
    category: 'Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#87CEEB'],
    color_names: [{ hex: '#87CEEB', name: 'Blue' }],
    stock_status: 'in_stock',
    images: [
      { url: '/images/stripedshirt-blue.jpg', color: '#87CEEB', isPrimary: true },
    ],
  },
  {
    id: '8',
    name: 'Bodysuit',
    price: 38,
    description:
      'Sleek and comfortable bodysuit that flatters your silhouette.',
    category: 'Bodysuits',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#F5F5DC'],
    color_names: [
      { hex: '#000000', name: 'Black' },
      { hex: '#F5F5DC', name: 'Beige' },
    ],
    stock_status: 'in_stock',
    images: [
      { url: '/images/bodysuit-black.jpg', color: '#000000', isPrimary: true },
      { url: '/images/bodysuit-beige.jpg', color: '#F5F5DC', isPrimary: false },
    ],
  },
];
