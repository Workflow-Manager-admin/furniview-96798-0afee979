import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchProducts, fetchCategories, testConnection } from '../utils/supabaseClient';

// PUBLIC_INTERFACE
const ProductsContext = createContext(undefined);

/**
 * PUBLIC_INTERFACE
 * Provider for product/catalog/category data, shared across the app.
 */
export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(null);
  // Filter state
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  // Test connection and load data
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setConnectionError(null);
      
      // Test connection first
      const connectionTest = await testConnection();
      if (!connectionTest.success) {
        console.error('Supabase connection failed:', connectionTest.error);
        setConnectionError('Failed to connect to database. Please check your internet connection.');
        setLoading(false);
        return;
      }
      
      // Load categories
      try {
        const cats = await fetchCategories();
        if (!cats || cats.length === 0) {
          setCategories(['All']);
        } else {
          setCategories(['All', ...cats]);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
        setCategories(['All']);
      }
      
      // Load products
      try {
        const productsData = await fetchProducts();
        setProducts(productsData || []);
        
        if (!productsData || productsData.length === 0) {
          console.warn('No products found in database');
        }
      } catch (err) {
        console.error('Failed to load products:', err);
        setProducts([]);
      }
      
      setLoading(false);
    }
    
    loadData();
  }, []);

  // PUBLIC_INTERFACE
  const filteredProducts = products.filter(product => {
    const matchesCat = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = search.length < 2 ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // PUBLIC_INTERFACE
  const contextValue = {
    products,
    categories,
    activeCategory,
    setActiveCategory,
    search,
    setSearch,
    filteredProducts,
    loading,
    connectionError,
    reloadProducts: async () => {
      setLoading(true);
      const productsData = await fetchProducts();
      setProducts(productsData || []);
      setLoading(false);
    }
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider.");
  return ctx;
}
