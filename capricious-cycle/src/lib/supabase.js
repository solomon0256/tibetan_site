// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL    = import.meta.env.ASTRO_SUPABASE_URL;
const SUPABASE_ANON   = import.meta.env.ASTRO_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);