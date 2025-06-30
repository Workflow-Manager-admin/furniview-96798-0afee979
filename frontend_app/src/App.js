import React, { useState, useMemo } from 'react';
import { ProductsProvider } from './context/ProductsContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import ContactModal from './components/ContactModal';
import ThemeToggle from './components/ThemeToggle';

import './App.css';

// PUBLIC_INTERFACE
function App() {
  // Modal/dialog state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showContact, setShowContact] = useState(false);

  // Theme state: auto, light, dark
  const [theme, setTheme] = useState('auto');
  useMemo(() => {
    // Manage theme according to system preference or user choice
    let final = theme;
    if (theme === 'auto') {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      final = prefersDark ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', final);
  }, [theme]);

  // PUBLIC_INTERFACE
  const handleProductClick = (product) => setSelectedProduct(product);
  // PUBLIC_INTERFACE
  const closeProductModal = () => setSelectedProduct(null);

  // PUBLIC_INTERFACE
  const handleContactOpen = () => setShowContact(true);
  // PUBLIC_INTERFACE
  const handleContactClose = () => setShowContact(false);

  return (
    <ProductsProvider>
      <div className="app-root">
        <Header onContact={handleContactOpen} />
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <div className="main-content">
          <Sidebar />
          <div className="product-area">
            <ProductGrid onProductClick={handleProductClick} />
          </div>
        </div>
        <Footer />
        {selectedProduct && <ProductModal product={selectedProduct} onClose={closeProductModal} />}
        {showContact && <ContactModal onClose={handleContactClose} />}
      </div>
    </ProductsProvider>
  );
}

export default App;
