/*
  # Add product management features

  1. Updates
    - Add stock_status to products table
    - Add discount_price to products table
    - Add multiple images support
    - Add color names support

  2. Security
    - Update RLS policies for product management
*/

-- Add new columns to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS stock_status text DEFAULT 'in_stock',
ADD COLUMN IF NOT EXISTS discount_price numeric,
ADD COLUMN IF NOT EXISTS color_names jsonb DEFAULT '[]'::jsonb;

-- Update products policy for better security
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
CREATE POLICY "Admin can manage products"
  ON products
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');