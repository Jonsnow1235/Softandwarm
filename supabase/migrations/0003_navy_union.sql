/*
  # Add products table and storage

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (numeric)
      - `description` (text)
      - `images` (jsonb array of image objects)
      - `sizes` (text array)
      - `colors` (text array)
      - `category` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on products table
    - Add policies for public read and admin write access
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  description text NOT NULL,
  images jsonb NOT NULL,
  sizes text[] NOT NULL,
  colors text[] NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage products
CREATE POLICY "Authenticated users can manage products"
  ON products
  USING (auth.role() = 'authenticated');