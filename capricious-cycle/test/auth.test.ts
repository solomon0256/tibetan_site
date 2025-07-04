// File: capricious-cycle/test/auth.test.ts
require('dotenv').config();
/** @jest-environment node */
const { Miniflare } = require('miniflare');

describe('Auth Routes', () => {
  let mf: any;

  beforeAll(() => {
    mf = new Miniflare({
      scriptPath: './dist/worker.bundle.js',
      modules: true,
      // environment variables already loaded via dotenv
    });
  });

  afterAll(async () => {
    await mf.dispose();
  });

  it('should refresh token', async () => {
    const res = await mf.dispatchFetch('http://localhost/api/v1/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: '<VALID_REFRESH_TOKEN>' }),
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.token).toMatch(/^eyJ/);
  });

  it('should logout successfully', async () => {
    const res = await mf.dispatchFetch('http://localhost/api/v1/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: '<VALID_ACCESS_TOKEN>' }),
    });
    expect(res.status).toBe(204);
  });
});