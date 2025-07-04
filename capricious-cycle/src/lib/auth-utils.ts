// src/lib/auth-utils.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});

export async function verifySupabaseJWT(token: string): Promise<{ userId: string }> {
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) {
    throw new Error(error?.message || 'Invalid token');
  }
  return { userId: data.user.id };
}

export async function generateNewJWT(refreshToken: string): Promise<string> {
  const { data, error } = await supabaseAdmin.auth.refreshSession({ refresh_token: refreshToken });
  if (error || !data.session) {
    throw new Error(error?.message || 'Failed to refresh token');
  }
  return data.session.access_token;
}