import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/schema';

export const supabaseUrl: string | undefined = import.meta.env
  .VITE_SUPABASE_URL;
const supabaseKey: string | undefined = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Supabase URL or API key is missing from environment variables.'
  );
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);
export default supabase;
