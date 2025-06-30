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
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4bnVrcW95bXZudW1rZGFyYm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2ODQ3NDAsImV4cCI6MjA2NTI2MDc0MH0.ulDDmC64Lzgl1L_UguQn9v0GwjKe3pnh1FruHVEUJlU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// PUBLIC_INTERFACE
export async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    console.log('URL:', SUPABASE_URL);
    console.log('Key (first 20 chars):', SUPABASE_KEY.substring(0, 20) + '...');
    
    const { data, error } = await supabase.from('products').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Connection test failed:', error);
      return { success: false, error };
    }
    
    console.log('Connection test successful. Product count:', data);
    return { success: true, count: data };
  } catch (err) {
    console.error('Connection test exception:', err);
    return { success: false, error: err };
  }
}

// PUBLIC_INTERFACE
export async function fetchProducts() {
  try {
    console.log('Fetching products from Supabase...');
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    
    console.log('Products fetched successfully:', data?.length || 0, 'items');
    return data || [];
  } catch (err) {
    console.error('Exception fetching products:', err);
    return [];
  }
}

// PUBLIC_INTERFACE
export async function fetchCategories() {
  try {
    console.log('Fetching categories from Supabase...');
    // Try dedicated categories table first, fallback to products distinct.
    const { data, error } = await supabase.from('categories').select('name');
    
    if (error || !data || !Array.isArray(data)) {
      console.log('Categories table not found or empty, trying products fallback...');
      // Fallback: get distinct from products
      const { data: prodData, error: prodError } = await supabase.from('products').select('category');
      
      if (prodError) {
        console.error('Error fetching categories from products:', prodError);
        return [];
      }
      
      if (!prodData) {
        console.log('No product data found for categories');
        return [];
      }
      
      const uniq = [...new Set(prodData.map(p => p.category))].filter(Boolean);
      console.log('Categories from products:', uniq);
      return uniq;
    }
    
    const categories = data.map(x => x.name);
    console.log('Categories fetched successfully:', categories);
    return categories;
  } catch (err) {
    console.error('Exception fetching categories:', err);
    return [];
  }
}

// PUBLIC_INTERFACE
export async function insertInquiry({ name, email, message }) {
  try {
    console.log('Inserting inquiry to Supabase...');
    const result = await supabase.from('inquiries').insert([
      { name, email, message }
    ]);
    
    if (result.error) {
      console.error('Error inserting inquiry:', result.error);
    } else {
      console.log('Inquiry inserted successfully');
    }
    
    return result;
  } catch (err) {
    console.error('Exception inserting inquiry:', err);
    return { error: err };
  }
}
