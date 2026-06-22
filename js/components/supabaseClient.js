// NutriLife Supabase Cloud Infrastructure Database Configuration

(function() {
  const SUPABASE_URL = "https://msapqzxsvtyujglpjoum.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhcGVzZSIsInJlZiI6Im1zYXBxenhzdnR5dWpnbHBqb3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MjU2NzgsImV4cCI6MjA5NTEwMTY3OH0.zyrHGssmoQqH5ZnlfFDVGxbAxGw9w3KBeKzvXkwnbfE";

  // CRITICAL PLATFORM GATEKEEPER: Fallback verify external global CDN bindings
  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    console.error(
      "🛑 Critical Failure: Supabase architecture client not found on standard global window. " +
      "Verify that the required script block is explicitly bound within your index.html DOM structure."
    );
    return;
  }

  try {
    // Generate unified real-time data client pointer wrapper
    window.supabaseClient = window.supabase.createClient(
      SUPABASE_URL, 
      SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      }
    );

    console.log("🚀 NutriLife Ecosystem: Supabase cloud middleware connection online and synchronized.");
  } catch (connectionError) {
    console.error("❌ Exception captured during Supabase infrastructure handshake execution:", connectionError);
  }
})();