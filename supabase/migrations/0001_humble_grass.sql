/*
  # Create orders table

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `phone_number` (text)
      - `address` (text)
      - `items` (jsonb)
      - `total_cost` (numeric)
      - `processed` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policy for admin access
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone_number text NOT NULL,
  address text NOT NULL,
  items jsonb NOT NULL,
  total_cost numeric NOT NULL,
  processed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can read orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true);