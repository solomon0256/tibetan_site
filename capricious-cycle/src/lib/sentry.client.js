// File: src/lib/sentry.client.js
// This file initializes Sentry for error tracking in the client-side of the application.
// It captures global errors and sends them to Sentry for monitoring and debugging.
import * as Sentry from '@sentry/browser';

if (import.meta.env.PUBLIC_ASTRO_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.PUBLIC_ASTRO_SENTRY_DSN,
    environment: import.meta.env.MODE,
    release: 'capricious-site@' + import.meta.env.BUILD_ID,
    tracesSampleRate: 0.1,
  });

  Sentry.setUser({
    email: 'wenyuhe03@gmial.com',
  });

  // 自动捕捉全局错误
  window.onerror = function (message, source, lineno, colno, error) {
    Sentry.captureException(error || message);
  };

  window.onunhandledrejection = function (event) {
    Sentry.captureException(event.reason);
  };

  if (import.meta.env.DEV) {
    console.log('[Sentry] Initialized');
  }
}
export { Sentry };

/*
 * --------------------------
 * [Sentry 使用说明与注意事项]
 * --------------------------
 *
 * ✅ 功能：该模块负责前端 Sentry 初始化，用于捕捉客户端错误（包括全局异常和未处理的 Promise）。
 *
 * ✅ 环境依赖：
 * - PUBLIC_ASTRO_SENTRY_DSN：必须在 Astro 环境变量中声明，用于指定 Sentry 项目 DSN。
 * - BUILD_ID：用于标记当前构建版本，便于在 Sentry 中追踪对应版本的错误。
 *
 * ✅ 捕捉策略：
 * - window.onerror：全局 JS 执行错误。
 * - window.onunhandledrejection：未处理的 Promise 异常。
 *
 * ✅ 注意事项：
 * - 该模块仅运行于浏览器环境，初始化逻辑需置于 `import.meta.env` 检查之后。
 * - 如需捕捉用户交互类异常，请在组件中手动使用 `Sentry.captureException()`。
 * - 若前端路由或 SPA 错误未能捕获，可考虑在框架层集成（如 React 的 ErrorBoundary）。
 * - Sentry 默认不上传 sourcemap，若需精准定位错误请配置构建脚本上传 sourcemap。
 *
 * ✅ 后续建议：
 * - 可接入 `Sentry.setContext()` 提供更多用户上下文。
 * - 使用 `beforeSend` hook 对异常上报进行过滤、脱敏处理。
 * - 可拓展为支持多端（如 Workers 端）的错误统一上报机制。
 *
 * 📌 若关闭监控，将 `PUBLIC_ASTRO_SENTRY_DSN` 留空即可避免初始化。
 */
