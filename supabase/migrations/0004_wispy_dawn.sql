/*
  # Add initial products

  1. New Products
    - Adds initial product data to the products table
*/

INSERT INTO products (id, name, price, description, images, sizes, colors, category)
VALUES 
  (
    gen_random_uuid(),
    'Hoodie Blanket',
    89.99,
    'Our bestselling hoodie blanket combines ultimate comfort with style.',
    '[{"url": "/images/hoodie-black.jpg", "color": "#000000", "isPrimary": true}, {"url": "/images/hoodie-beige.jpg", "color": "#F5F5DC", "isPrimary": false}]',
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['#000000', '#F5F5DC'],
    'Hoodies'
  ),
  (
    gen_random_uuid(),
    'Stripped Oversized Shirt',
    69.99,
    'Casual yet elegant stripped oversized shirt perfect for any occasion.',
    '[{"url": "/images/shirt-white.jpg", "color": "#FFFFFF", "isPrimary": true}, {"url": "/images/shirt-black.jpg", "color": "#000000", "isPrimary": false}]',
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['#FFFFFF', '#000000'],
    'Shirts'
  ),
  (
    gen_random_uuid(),
    'Wide Leg Pants',
    79.99,
    'Comfortable and stylish wide leg pants for a sophisticated look.',
    '[{"url": "/images/pants-white.jpg", "color": "#FFFFFF", "isPrimary": true}, {"url": "/images/pants-black.jpg", "color": "#000000", "isPrimary": false}]',
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['#FFFFFF', '#000000'],
    'Pants'
  );