-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view products" ON products;
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;

-- Create new, more permissive policies for the admin interface
CREATE POLICY "Enable read access for all users"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable insert for all users"
  ON products FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable update for all users"
  ON products FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Enable delete for all users"
  ON products FOR DELETE
  TO public
  USING (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_orders_processed ON orders(processed);