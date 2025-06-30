import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchProducts, fetchCategories } from '../utils/supabaseClient';

// PUBLIC_INTERFACE
const ProductsContext = createContext(undefined);

/**
 * PUBLIC_INTERFACE
 * Provider for product/catalog/category data, shared across the app.
 */
export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // Filter state
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  // Load categories from Supabase
  useEffect(() => {
    fetchCategories().then(cats => {
      if (!cats || cats.length === 0) {
        setCategories(['All']);
      } else {
        setCategories(['All', ...cats]);
      }
    });
  }, []);

  // Load products from Supabase
  useEffect(() => {
    fetchProducts().then(products => {
      setProducts(products || []);
    });
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
    reloadProducts: async () => setProducts(await fetchProducts())
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
