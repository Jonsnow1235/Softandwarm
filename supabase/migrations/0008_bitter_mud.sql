/*
  # Update database policies and realtime settings
  
  1. Changes
    - Reset and recreate policies for products and orders tables
    - Enable realtime for products table only (orders already enabled)
    
  2. Security
    - Allow public read access to products
    - Allow authenticated users full access to products
    - Allow public to create orders
    - Allow public to read their orders
    - Allow authenticated users to manage orders
*/

-- Reset policies
DROP POLICY IF EXISTS "Anyone can view products" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
DROP POLICY IF EXISTS "Anyone can read their own orders" ON orders;
DROP POLICY IF EXISTS "Admin can manage orders" ON orders;

-- Products policies
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage products"
  ON products FOR ALL
  TO authenticated
  WITH CHECK (true);

-- Orders policies
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read their own orders"
  ON orders FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage orders"
  ON orders FOR ALL
  TO authenticated
  WITH CHECK (true);

-- Enable realtime for products only (orders already enabled)
ALTER PUBLICATION supabase_realtime ADD TABLE products;