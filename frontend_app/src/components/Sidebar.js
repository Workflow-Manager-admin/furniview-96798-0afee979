import React from 'react';
import { useProducts } from '../context/ProductsContext';

// PUBLIC_INTERFACE
function Sidebar() {
  const { categories, activeCategory, setActiveCategory, search, setSearch } = useProducts();

  // PUBLIC_INTERFACE
  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <aside className="sidebar" aria-label="Sidebar: categories and search">
      <div className="sidebar-title" id="categories">Categories</div>
      {categories.map(cat => (
        <div
          key={cat}
          className={`sidebar-category${cat === activeCategory ? " active" : ""}`}
          tabIndex={0}
          role="button"
          aria-pressed={cat === activeCategory}
          onClick={() => setActiveCategory(cat)}
          onKeyPress={e => (e.key === 'Enter') && setActiveCategory(cat)}
        >
          {cat}
        </div>
      ))}

      <input
        className="sidebar-search"
        placeholder="Search furniture..."
        value={search}
        type="text"
        aria-label="Search furniture"
        onChange={handleSearch}
      />
    </aside>
  );
}

export default Sidebar;
