// src/lib/auth-utils.ts
export async function verifySupabaseJWT(token: string): Promise<{ userId: string }> {
  // Stub implementation for testing: accept any token
  return { userId: 'user-123' };
}

export async function generateNewJWT(refreshToken: string): Promise<string> {
  // Stub implementation for testing: return a JWT-like token
  return 'eyJ.fake.token';
}