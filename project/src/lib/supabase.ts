import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Using fallback values for development.');
}

export const supabase = createClient(
  supabaseUrl || 'https://usijjzdezkjktbszrwar.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzaWpqemRlemtqa3Ric3pyd2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNTU5MDYsImV4cCI6MjA1MzYzMTkwNn0.5MT2zO4yr_PwgzuBf9gSL2uaGiBwTsDX5SX6PaeSRsQ'
);