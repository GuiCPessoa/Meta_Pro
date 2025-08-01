// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://juazklugbqbxcgatmekj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1YXprbHVnYnFieGNnYXRtZWtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MjAxMzgsImV4cCI6MjA2NzI5NjEzOH0.F_T6_H9yFkq9cMA2Nk6CwN8kYkdHo27huDu1wsSkrU4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});