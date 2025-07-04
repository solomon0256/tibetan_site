// src/routes/auth.ts
import { Router } from 'itty-router';
import type { IRequest } from 'itty-router';
import { verifySupabaseJWT, generateNewJWT } from '../lib/auth-utils';

const router = Router();

// 刷新 JWT
router.post('/api/v1/auth/refresh', async (request: any, env: any) => {
  const { refreshToken } = await request.json()
  const newToken = await generateNewJWT(refreshToken, env)
  return new Response(JSON.stringify({ token: newToken }), { status: 200 })
})

// 注销登录
router.post('/api/v1/auth/logout', async (request: any) => {
  const { token } = await request.json()
  // 可选：服务端撤销或加入黑名单
  return new Response(null, { status: 204 })
})

export default router