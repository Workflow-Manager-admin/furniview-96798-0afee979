const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://sxnukqoymvnumkdarbnt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4bnVrcW95bXZudW1rZGFyYm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2ODQ3NDAsImV4cCI6MjA2NTI2MDc0MH0.ulDDmC64Lzgl1L_UguQn9v0GwjKe3pnh1FruHVEUJlU';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testSupabase() {
  console.log('Testing Supabase connection...');
  console.log('URL:', SUPABASE_URL);
  console.log('Key (first 20 chars):', SUPABASE_KEY.substring(0, 20) + '...');
  
  try {
    // Test connection by querying products table
    console.log('\n--- Testing products table ---');
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(5);
    
    if (productsError) {
      console.error('Products query error:', productsError);
    } else {
      console.log('Products found:', products?.length || 0);
      if (products && products.length > 0) {
        console.log('Sample product:', products[0]);
      }
    }
    
    // Test categories
    console.log('\n--- Testing categories ---');
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*');
    
    if (categoriesError) {
      console.log('Categories table error (might not exist):', categoriesError.message);
      
      // Try getting categories from products
      console.log('Trying to get categories from products...');
      const { data: productCategories, error: prodCatError } = await supabase
        .from('products')
        .select('category');
      
      if (prodCatError) {
        console.error('Product categories error:', prodCatError);
      } else {
        const uniqueCategories = [...new Set(productCategories?.map(p => p.category))].filter(Boolean);
        console.log('Categories from products:', uniqueCategories);
      }
    } else {
      console.log('Categories found:', categories?.length || 0);
      if (categories) {
        console.log('Categories:', categories.map(c => c.name || c));
      }
    }
    
    // Test inquiries table
    console.log('\n--- Testing inquiries table ---');
    const { data: inquiries, error: inquiriesError } = await supabase
      .from('inquiries')
      .select('count', { count: 'exact', head: true });
    
    if (inquiriesError) {
      console.log('Inquiries table error (might not exist):', inquiriesError.message);
    } else {
      console.log('Inquiries table exists, count check successful');
    }
    
  } catch (err) {
    console.error('Test failed with exception:', err);
  }
}

testSupabase();
