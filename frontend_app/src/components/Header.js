import React from 'react';

// PUBLIC_INTERFACE
function Header({ onContact }) {
  return (
    <header className="header" role="banner">
      <a href="/" className="header-logo">
        <span role="img" aria-label="Chair" style={{ marginRight: 10, fontSize: '1.35em' }}>🪑</span>
        FurniView
      </a>
      <nav className="header-nav" aria-label="Main navigation">
        <a href="#catalog">Catalog</a>
        <a href="#categories">Categories</a>
        <button className="header-contact-btn" onClick={onContact}>Contact</button>
      </nav>
    </header>
  );
}

export default Header;
