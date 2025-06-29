// src/hooks.server.js
import { init } from '@sentry/node';
import * as Sentry from '@sentry/node';
console.log('⎘ ASTRO_SENTRY_DSN=', process.env.ASTRO_SENTRY_DSN);
console.log('⎘ ASTRO_NODE_ENV=', process.env.ASTRO_NODE_ENV);
init({

  dsn: process.env.ASTRO_SENTRY_DSN,
  environment: process.env.ASTRO_NODE_ENV,
  tracesSampleRate: 0.1,
});

export function onError({ error }) {
  Sentry.captureException(error);
}