const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://sxnukqoymvnumkdarbnt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4bnVrcW95bXZudW1rZGFyYm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2ODQ3NDAsImV4cCI6MjA2NTI2MDc0MH0.ulDDmC64Lzgl1L_UguQn9v0GwjKe3pnh1FruHVEUJlU';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const sampleProducts = [
  {
    name: 'Modern Sectional Sofa',
    category: 'Sofas',
    price: 1299.99,
    description: 'Comfortable L-shaped sectional sofa with premium fabric upholstery. Perfect for modern living rooms.',
    short_description: 'Comfortable L-shaped sectional sofa',
    image: 'https://via.placeholder.com/320x180?text=Sectional+Sofa',
    material: 'Premium Fabric',
    dimensions: '108" W x 75" D x 35" H'
  },
  {
    name: 'Elegant Coffee Table',
    category: 'Tables',
    price: 449.99,
    description: 'Glass-top coffee table with sleek metal legs. Adds sophistication to any living space.',
    short_description: 'Glass-top coffee table with metal legs',
    image: 'https://via.placeholder.com/320x180?text=Coffee+Table',
    material: 'Glass & Steel',
    dimensions: '48" W x 24" D x 18" H'
  },
  {
    name: 'Ergonomic Office Chair',
    category: 'Chairs',
    price: 329.99,
    description: 'High-back executive office chair with lumbar support and adjustable height.',
    short_description: 'High-back executive office chair',
    image: 'https://via.placeholder.com/320x180?text=Office+Chair',
    material: 'Leather & Mesh',
    dimensions: '26" W x 28" D x 42-46" H'
  },
  {
    name: 'King Size Platform Bed',
    category: 'Beds',
    price: 899.99,
    description: 'Minimalist platform bed frame with built-in headboard. Made from solid wood.',
    short_description: 'Minimalist platform bed frame',
    image: 'https://via.placeholder.com/320x180?text=Platform+Bed',
    material: 'Solid Oak',
    dimensions: '86" W x 82" D x 48" H'
  },
  {
    name: '6-Drawer Storage Dresser',
    category: 'Storage',
    price: 549.99,
    description: 'Spacious dresser with six deep drawers and modern handles. Great for bedroom storage.',
    short_description: 'Spacious dresser with six drawers',
    image: 'https://via.placeholder.com/320x180?text=Dresser',
    material: 'MDF & Wood Veneer',
    dimensions: '60" W x 18" D x 34" H'
  },
  {
    name: 'Accent Armchair',
    category: 'Chairs',
    price: 399.99,
    description: 'Stylish accent chair with button tufting and wooden legs. Perfect reading chair.',
    short_description: 'Stylish accent chair with tufting',
    image: 'https://via.placeholder.com/320x180?text=Accent+Chair',
    material: 'Velvet & Wood',
    dimensions: '32" W x 34" D x 36" H'
  }
];

const sampleCategories = [
  { name: 'Sofas' },
  { name: 'Tables' },
  { name: 'Chairs' },
  { name: 'Beds' },
  { name: 'Storage' }
];

async function seedData() {
  console.log('Seeding sample furniture data...');
  
  try {
    // Check if products already exist
    const { data: existingProducts } = await supabase
      .from('products')
      .select('count', { count: 'exact', head: true });
    
    console.log('Existing products count:', existingProducts);
    
    // Insert categories if they don't exist
    console.log('Inserting categories...');
    const { data: categoriesResult, error: categoriesError } = await supabase
      .from('categories')
      .upsert(sampleCategories, { onConflict: 'name' });
    
    if (categoriesError) {
      console.log('Categories insert result:', categoriesError.message);
    } else {
      console.log('Categories inserted successfully');
    }
    
    // Insert products
    console.log('Inserting products...');
    const { data: productsResult, error: productsError } = await supabase
      .from('products')
      .upsert(sampleProducts, { onConflict: 'name' });
    
    if (productsError) {
      console.error('Products insert error:', productsError);
    } else {
      console.log('Products inserted successfully');
    }
    
    // Verify final count
    const { data: finalProducts } = await supabase
      .from('products')
      .select('*');
    
    console.log('Final products count:', finalProducts?.length || 0);
    
  } catch (err) {
    console.error('Seeding failed:', err);
  }
}

seedData();
