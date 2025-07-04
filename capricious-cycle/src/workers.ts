import authRouter from './routes/auth';
import type { Request } from '@cloudflare/workers-types';

export default {
  async fetch(request: Request, env: any, ctx: any) {
    try {
      // Delegate to router, passing `env` for auth-utils
      const response = await authRouter.handle(request, env);
      return response ?? new Response('Not Found', { status: 404 });
    } catch (err: any) {
      console.error('[Worker Error]', err);
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
};