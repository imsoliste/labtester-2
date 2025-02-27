import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Jaipur Labs Data
const labData = [
  {
    name: 'Pathkind Labs',
    city: 'Jaipur',
    address: 'Raja Park, Jaipur',
    tests: ['Full Body Checkup', 'Blood Sugar', 'Liver Function Test'],
    prices: { 'Full Body Checkup': 999, 'Blood Sugar': 199, 'Liver Function Test': 599 }
  },
  {
    name: 'Dr. Lal PathLabs',
    city: 'Jaipur',
    address: 'Malviya Nagar, Jaipur',
    tests: ['Thyroid Test', 'Complete Blood Count', 'Cholesterol Test'],
    prices: { 'Thyroid Test': 499, 'Complete Blood Count': 299, 'Cholesterol Test': 399 }
  },
  {
    name: 'Path Plus Care',
    city: 'Jaipur',
    address: 'Vaishali Nagar, Jaipur',
    tests: ['Kidney Function Test', 'Vitamin D Test', 'Diabetes Panel'],
    prices: { 'Kidney Function Test': 899, 'Vitamin D Test': 699, 'Diabetes Panel': 1199 }
  },
  {
    name: 'Tata 1mg Labs',
    city: 'Jaipur',
    address: 'C-Scheme, Jaipur',
    tests: ['Iron Deficiency Test', 'Cardiac Risk Markers', 'Lipid Profile'],
    prices: { 'Iron Deficiency Test': 349, 'Cardiac Risk Markers': 899, 'Lipid Profile': 749 }
  },
  {
    name: 'Redcliffe Labs',
    city: 'Jaipur',
    address: 'Mansarovar, Jaipur',
    tests: ['Full Body Checkup Advanced', 'Liver Panel', 'Dengue Test'],
    prices: { 'Full Body Checkup Advanced': 1499, 'Liver Panel': 799, 'Dengue Test': 599 }
  }
];

// Function to insert data
const insertLabs = async () => {
  for (const lab of labData) {
    const { data, error } = await supabase.from('labs').insert([lab]);

    if (error) {
      console.error(`Error inserting ${lab.name}:`, error.message);
    } else {
      console.log(`Inserted ${lab.name} successfully!`);
    }
  }
};

// Run the insert function
insertLabs();
