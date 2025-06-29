// src/pages/api/test.js
export async function GET() {
  // 强制抛错，触发 Hooks 捕获
  throw new Error('💥 Sentry SSR 测试');
}