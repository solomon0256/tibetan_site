// File: capricious-cycle/src/lib/auth-utils.ts
import { createClient } from '@supabase/supabase-js';

// Helper to create Supabase Admin client per request env
function getSupabaseAdmin(env: { SUPABASE_URL: string; SUPABASE_SERVICE_ROLE_KEY: string }) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
}

// 1) Verify JWT, now accepts env
export async function verifySupabaseJWT(
  token: string,
  env: { SUPABASE_URL: string; SUPABASE_SERVICE_ROLE_KEY: string }
): Promise<{ userId: string }> {
  const supabaseAdmin = getSupabaseAdmin(env);
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) {
    throw new Error(error?.message || 'Invalid token');
  }
  return { userId: data.user.id };
}

// 2) Refresh JWT, now accepts env
export async function generateNewJWT(
  refreshToken: string,
  env: { SUPABASE_URL: string; SUPABASE_SERVICE_ROLE_KEY: string }
): Promise<string> {
  const supabaseAdmin = getSupabaseAdmin(env);
  const { data, error } = await supabaseAdmin.auth.refreshSession({ refresh_token: refreshToken });
  if (error || !data.session?.access_token) {
    throw new Error(error?.message || 'Failed to refresh token');
  }
  return data.session.access_token;
}