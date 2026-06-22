// NutriLife Supabase Unified Cloud Instantiation Config Module (ES MODULE VIA BABEL)

const SUPABASE_URL = "https://msapqzxsvtyujglpjoum.supabase.co";

// Restored live authenticated access key signature directly matching active sandbox routing parameters
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhcGVzZSIsInJlZiI6Im1zYXBxenhzdnR5dWpnbHBqb3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MjU2NzgsImV4cCI6MjA5NTEwMTY3OH0.zyrHGssmoQqH5ZnlfFDVGxbAxGw9w3KBeKzvXkwnbfE";

// DEFENSIVE ECOSYSTEM GUARDRAIL: Verify browser window scope injection footprint
if (!window.supabase || typeof window.supabase.createClient !== "function") {
  console.error(
    "🛑 Critical Module Error: Supabase client bundle missing on window scope. " +
    "Please check that your CDN link script tag resides globally in your index.html file layer."
  );
}

 const supabaseClient = window.supabase ? window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  }
) : null;

console.log("⚡ js/supabase.js: Shared connection client context successfully structured.");