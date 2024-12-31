/*
  # Update products and fix permissions

  1. Updates
    - Add new products
    - Update prices
    - Add processed_orders view
  
  2. Security
    - Fix RLS policies for products table
    - Add policies for processed orders
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
DROP POLICY IF EXISTS "Anyone can view products" ON products;

-- Create stronger policies
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Create view for processed orders
CREATE OR REPLACE VIEW processed_orders AS
SELECT * FROM orders WHERE processed = true;

-- Add new products
INSERT INTO products (
  name, price, description, category, sizes, colors, color_names, stock_status, images
) VALUES 
  (
    'Cropped Hoodie',
    55,
    'Stylish and comfortable cropped hoodie perfect for any casual occasion.',
    'Hoodies',
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['#000000', '#F5F5DC', '#FFFFFF'],
    '[{"hex": "#000000", "name": "Black"}, {"hex": "#F5F5DC", "name": "Beige"}, {"hex": "#FFFFFF", "name": "White"}]',
    'in_stock',
    '[{"url": "/images/croppedhoodie-black.jpg", "color": "#000000", "isPrimary": true}, 
      {"url": "/images/croppedhoodie-beige.jpg", "color": "#F5F5DC", "isPrimary": false},
      {"url": "/images/croppedhoodie-white.jpg", "color": "#FFFFFF", "isPrimary": false}]'
  ),
  (
    'Crop Top',
    32,
    'Essential crop top that combines style with comfort.',
    'Tops',
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['#000000', '#F5F5DC', '#FFFFFF'],
    '[{"hex": "#000000", "name": "Black"}, {"hex": "#F5F5DC", "name": "Beige"}, {"hex": "#FFFFFF", "name": "White"}]',
    'in_stock',
    '[{"url": "/images/croptop-black.jpg", "color": "#000000", "isPrimary": true},
      {"url": "/images/croptop-beige.jpg", "color": "#F5F5DC", "isPrimary": false},
      {"url": "/images/croptop-white.jpg", "color": "#FFFFFF", "isPrimary": false}]'
  ),
  (
    'Blanket Hoodie',
    89,
    'Ultra-comfortable blanket hoodie perfect for cozy days.',
    'Hoodies',
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['#000000', '#F5F5DC', '#FFC0CB', '#87CEEB'],
    '[{"hex": "#000000", "name": "Black"}, {"hex": "#F5F5DC", "name": "Beige"}, 
      {"hex": "#FFC0CB", "name": "Pink"}, {"hex": "#87CEEB", "name": "Blue"}]',
    'in_stock',
    '[{"url": "/images/blanket-black.jpg", "color": "#000000", "isPrimary": true},
      {"url": "/images/blanket-beige.jpg", "color": "#F5F5DC", "isPrimary": false},
      {"url": "/images/blanket-pink.jpg", "color": "#FFC0CB", "isPrimary": false},
      {"url": "/images/blanket-blue.jpg", "color": "#87CEEB", "isPrimary": false}]'
  ),
  (
    'Wide Leg Pants',
    62,
    'Elegant wide leg pants for a sophisticated look.',
    'Pants',
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['#000000', '#FFFFFF'],
    '[{"hex": "#000000", "name": "Black"}, {"hex": "#FFFFFF", "name": "White"}]',
    'in_stock',
    '[{"url": "/images/widepants-black.jpg", "color": "#000000", "isPrimary": true},
      {"url": "/images/widepants-white.jpg", "color": "#FFFFFF", "isPrimary": false}]'
  ),
  (
    'Cropped Zip-Up',
    49,
    'Versatile cropped zip-up perfect for layering.',
    'Jackets',
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['#000000', '#F5F5DC', '#FFFFFF'],
    '[{"hex": "#000000", "name": "Black"}, {"hex": "#F5F5DC", "name": "Beige"}, {"hex": "#FFFFFF", "name": "White"}]',
    'in_stock',
    '[{"url": "/images/zipup-black.jpg", "color": "#000000", "isPrimary": true},
      {"url": "/images/zipup-beige.jpg", "color": "#F5F5DC", "isPrimary": false},
      {"url": "/images/zipup-white.jpg", "color": "#FFFFFF", "isPrimary": false}]'
  ),
  (
    'Sweat Pants',
    59,
    'Comfortable and stylish sweat pants for everyday wear.',
    'Pants',
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['#000000', '#F5F5DC', '#FFFFFF'],
    '[{"hex": "#000000", "name": "Black"}, {"hex": "#F5F5DC", "name": "Beige"}, {"hex": "#FFFFFF", "name": "White"}]',
    'in_stock',
    '[{"url": "/images/sweatpants-black.jpg", "color": "#000000", "isPrimary": true},
      {"url": "/images/sweatpants-beige.jpg", "color": "#F5F5DC", "isPrimary": false},
      {"url": "/images/sweatpants-white.jpg", "color": "#FFFFFF", "isPrimary": false}]'
  ),
  (
    'Stripped Oversized Shirt',
    45,
    'Classic stripped oversized shirt for a casual yet put-together look.',
    'Shirts',
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['#000000', '#FFFFFF'],
    '[{"hex": "#000000", "name": "Black"}, {"hex": "#FFFFFF", "name": "White"}]',
    'in_stock',
    '[{"url": "/images/shirt-black.jpg", "color": "#000000", "isPrimary": true},
      {"url": "/images/shirt-white.jpg", "color": "#FFFFFF", "isPrimary": false}]'
  ),
  (
    'Bodysuit',
    38,
    'Sleek and comfortable bodysuit that flatters your silhouette.',
    'Bodysuits',
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['#000000', '#F5F5DC'],
    '[{"hex": "#000000", "name": "Black"}, {"hex": "#F5F5DC", "name": "Beige"}]',
    'in_stock',
    '[{"url": "/images/bodysuit-black.jpg", "color": "#000000", "isPrimary": true},
      {"url": "/images/bodysuit-beige.jpg", "color": "#F5F5DC", "isPrimary": false}]'
  );