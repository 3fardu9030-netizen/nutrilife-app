import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    "🛑 Critical Failure: Supabase environment keys are missing! " +
    "Please double-check that your .env file is correctly configured in your root directory."
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true 
  }
});

// Alias export to resolve the import error in your components
export const supabaseClient = supabase;

console.log("🚀 NutriLife Ecosystem: Supabase cloud connection initialized successfully.");