import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.ASTRO_SENTRY_DSN,
  environment: process.env.ASTRO_NODE_ENV,
  tracesSampleRate: 0.1,
  sendDefaultPii: true,
});