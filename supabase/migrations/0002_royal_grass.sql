/*
  # Update orders table policies

  1. Security Changes
    - Add INSERT policy for anyone to create orders
    - Add UPDATE policy for authenticated users to mark orders as processed
*/

-- Allow anyone to insert orders
CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to update order status
CREATE POLICY "Authenticated users can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);