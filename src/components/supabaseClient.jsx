import { createClient } from "@supabase/supabase-js";

// 1. Use empty string fallbacks to prevent runtime errors during initialization
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// 2. Clearer console notification for debugging
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "⚠️ Supabase Warning: Environment variables (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) are missing. " +
    "Database features will be disabled."
  );
}

// 3. Instantiate the client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true // Added for seamless redirect handling
  }
});

// Alias for legacy support in your existing components
export const supabaseClient = supabase;

console.log("🚀 NutriLife Ecosystem: Cloud connection initialized.");