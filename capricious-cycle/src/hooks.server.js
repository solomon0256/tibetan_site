// src/hooks.server.js
import * as Sentry from '@sentry/node';

if (process.env.ASTRO_SENTRY_DSN) {
  console.log('⎘ ASTRO_SENTRY_DSN=', process.env.ASTRO_SENTRY_DSN);
  console.log('⎘ ASTRO_NODE_ENV=', process.env.ASTRO_NODE_ENV);
  Sentry.init({
    dsn: process.env.ASTRO_SENTRY_DSN,
    environment: process.env.ASTRO_NODE_ENV,
    tracesSampleRate: 0.1,
  });
} else {
  console.warn('⚠️ 未检测到 ASTRO_SENTRY_DSN，Sentry 未初始化');
}

export function onError({ error }) {
  Sentry.captureException(error);
}