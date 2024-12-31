/*
  # Fix Products Table Policies

  1. Updates
    - Drop existing policies
    - Add new policies for proper access control
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view products" ON products;
DROP POLICY IF EXISTS "Admin can manage products" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;

-- Allow public read access
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

-- Allow full access for authenticated users
CREATE POLICY "Authenticated users can manage products"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);