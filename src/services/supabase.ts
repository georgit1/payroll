import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/schema';

export const supabaseUrl = 'https://xahtzxzudefiypsbsfhp.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhaHR6eHp1ZGVmaXlwc2JzZmhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkyMzIxNTksImV4cCI6MjAwNDgwODE1OX0.KidpWNiO_y1wMp0d0U87Wkr99Wg8W_m_yMzHW-1391s';
const supabase = createClient<Database>(supabaseUrl, supabaseKey);
export default supabase;
