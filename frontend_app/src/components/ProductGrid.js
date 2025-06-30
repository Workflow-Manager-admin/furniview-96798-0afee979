import React from 'react';
import { useProducts } from '../context/ProductsContext';

// PUBLIC_INTERFACE
function ProductGrid({ onProductClick }) {
  const { filteredProducts, loading, connectionError } = useProducts();

  if (loading) {
    return (
      <div style={{ padding: '2rem', color: '#666', textAlign: 'center' }}>
        Loading products...
      </div>
    );
  }

  if (connectionError) {
    return (
      <div style={{ padding: '2rem', color: '#e20640', textAlign: 'center' }}>
        <div style={{ marginBottom: '1rem' }}>❌ {connectionError}</div>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>
          Please check your internet connection and try refreshing the page.
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div style={{ padding: '2rem', color: '#666', textAlign: 'center' }}>
        <div style={{ marginBottom: '1rem' }}>No products match your selection.</div>
        <div style={{ fontSize: '0.9rem' }}>
          Try adjusting your search terms or category filter.
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid" id="catalog" role="list">
      {filteredProducts.map(product => (
        <div
          className="product-card"
          key={product.id}
          role="listitem"
          aria-label={product.name}
          tabIndex={0}
          onClick={() => onProductClick(product)}
          onKeyDown={e => (e.key === 'Enter') && onProductClick(product)}
        >
          <div className="product-img-wrap">
            <img
              src={product.image || `https://via.placeholder.com/220x160?text=${encodeURIComponent(product.name)}`}
              alt={product.name}
              className="product-img"
              loading="lazy"
            />
          </div>
          <div className="product-info">
            <div className="product-title">{product.name}</div>
            <div className="product-category">{product.category}</div>
            <div className="product-price">${Number(product.price).toLocaleString()}</div>
            <div className="product-shortdesc">{product.short_description || product.description?.slice(0,54) + '...'}</div>
            <button className="product-detail-link" tabIndex={-1}>View Details</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
