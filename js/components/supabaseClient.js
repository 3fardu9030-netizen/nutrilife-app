import { createClient } from '@supabase/supabase-js';

// This is already your correct URL:
const supabaseUrl = 'https://msabqzswtyujglgtjoum.supabase.co';

// Copy and paste the long string from your 'anon / public' section here:
const supabaseAnonKey = 'sb_publishable_3eU-k0n3yGHWC53T97PUmA_bBgwkb6Z'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);