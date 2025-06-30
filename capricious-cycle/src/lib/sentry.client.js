import * as Sentry from '@sentry/browser';

if (import.meta.env.PUBLIC_ASTRO_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.PUBLIC_ASTRO_SENTRY_DSN,
    environment: import.meta.env.PUBLIC_ASTRO_NODE_ENV,
    tracesSampleRate: 0.1,
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