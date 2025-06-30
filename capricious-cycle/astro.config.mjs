// Instrument Sentry before everything else
import './instrument.mjs';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  integrations: [
    tailwind(),
  ],
  vite: {
    define: {
      'import.meta.env.PUBLIC_ASTRO_SENTRY_DSN': JSON.stringify(process.env.PUBLIC_ASTRO_SENTRY_DSN),
      'import.meta.env.ASTRO_NODE_ENV': JSON.stringify(process.env.ASTRO_NODE_ENV)
    },
    build: {
      sourcemap: true
    }
  }
});