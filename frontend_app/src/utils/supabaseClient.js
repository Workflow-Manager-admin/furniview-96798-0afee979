/*
  Utility for Supabase API integration for the FurniView furniture store.
  This expects .env vars SUPABASE_URL and SUPABASE_KEY to be set in the environment, 
  but also supports local dev by inline defaults.

  The schema is expected to have:
    - a 'products' table: id, name, category, price, description, short_description, image, material, dimensions
    - a 'categories' table OR use distinct categories in products.
    - a 'inquiries' table: id, name, email, message, created_at
*/
import { createClient } from '@supabase/supabase-js';

// PUBLIC_INTERFACE
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://sxnukqoymvnumkdarbnt.supabase.co';
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4bnVrcW95bXZudW1rY...' // truncated for security;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// PUBLIC_INTERFACE
export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true });
  if (error) return [];
  return data;
}

// PUBLIC_INTERFACE
export async function fetchCategories() {
  // Try dedicated categories table first, fallback to products distinct.
  const { data, error } = await supabase.from('categories').select('name');
  if (error || !data || !Array.isArray(data)) {
    // Fallback: get distinct from products
    const { data: prodData } = await supabase.from('products').select('category');
    if (!prodData) return [];
    const uniq = [...new Set(prodData.map(p => p.category))].filter(Boolean);
    return uniq;
  }
  return data.map(x => x.name);
}

// PUBLIC_INTERFACE
export async function insertInquiry({ name, email, message }) {
  return await supabase.from('inquiries').insert([
    { name, email, message }
  ]);
}
