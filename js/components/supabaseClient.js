// js/supabase.js

const SUPABASE_URL = 'https://msabqzswtyujglgtjoum.supabase.co';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zYXBxenhzdnR5dWpnbHBqb3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MjU2NzgsImV4cCI6MjA5NTEwMTY3OH0.zyrHGssmoQqH5ZnlfFDVGxbAxGw9w3KBeKzvXkwnbfE';

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);