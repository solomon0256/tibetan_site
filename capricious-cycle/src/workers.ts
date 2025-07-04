import authRouter from './routes/auth';

addEventListener('fetch', (e: FetchEvent) => {
  const url = new URL(e.request.url);
  // Stub /api/v1/auth/refresh
  if (e.request.method === 'POST' && url.pathname === '/api/v1/auth/refresh') {
    return e.respondWith(new Response(JSON.stringify({ token: 'eyJ.fake.token' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }));
  }
  // Stub /api/v1/auth/logout
  if (e.request.method === 'POST' && url.pathname === '/api/v1/auth/logout') {
    return e.respondWith(new Response(null, { status: 204 }));
  }
  // Fallback to router for other paths
  return e.respondWith(authRouter.handle(e.request) ?? new Response('Not Found', { status: 404 }));
});