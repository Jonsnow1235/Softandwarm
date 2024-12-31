import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { App } from './App';
import { CartProvider } from './hooks/useCart';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
      <Toaster />
    </CartProvider>
  </StrictMode>
);