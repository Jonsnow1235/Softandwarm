import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { About } from './pages/About';
import { Cart } from './pages/Cart';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProductDetail } from './pages/ProductDetail';
import { AdminRoute } from './components/auth/AdminRoute';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;