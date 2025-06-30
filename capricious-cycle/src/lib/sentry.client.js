

import * as Sentry from '@sentry/browser';

if (import.meta.env.PUBLIC_ASTRO_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.PUBLIC_ASTRO_SENTRY_DSN,
    environment: import.meta.env.PUBLIC_ASTRO_NODE_ENV,
    tracesSampleRate: 0.1,
  });
}