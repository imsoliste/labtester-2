import { supabase } from './supabase';

export const fetchJaipurLabs = async () => {
  const { data, error } = await supabase
    .from('labs') // Assuming your table is named "labs"
    .select('*')
    .eq('city', 'Jaipur'); // Fetching only Jaipur-based labs

  if (error) {
    console.error('Error fetching labs:', error);
    return [];
  }
  return data;
};
