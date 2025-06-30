import React from 'react';

// PUBLIC_INTERFACE
function ProductModal({ product, onClose }) {
  if (!product) return null;
  return (
    <div className="fv-modal-bg" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="fv-modal"
        onClick={e => e.stopPropagation()}
        style={{minWidth: 0, width: '90vw', maxWidth: 400}}
      >
        <button onClick={onClose} className="fv-modal-close" aria-label="Close details">&times;</button>
        <div style={{textAlign: 'center', marginBottom: '1.1rem'}}>
          <img
            src={product.image || `https://via.placeholder.com/340x180?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            style={{maxWidth: 220, borderRadius: 10, marginBottom: '1.1rem', background: '#f4f4ee'}}
          />
        </div>
        <div>
          <div style={{fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '.35rem'}}>
            {product.name}
          </div>
          <div style={{color: '#888', fontSize: '1.01rem', marginBottom: '0.4rem'}}>{product.category}</div>
          <div style={{color: 'var(--color-accent)', fontWeight: 700, marginBottom: '.7rem'}}>${Number(product.price).toLocaleString()}</div>
          <div style={{marginBottom: '0.9rem', color: 'var(--text-main)'}}>{product.description}</div>
          <div style={{fontSize: '0.97rem', color: '#949494', marginBottom: '1.2rem'}}>
            {product.material && <span>Material: {product.material}</span>}
            {product.dimensions && <span> &bull; Size: {product.dimensions}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
