// Instrument Sentry before everything else
import './instrument.mjs';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import { defineConfig } from 'astro/config';

export default defineConfig({
    integrations: [
      tailwind(),
      cloudflare(),
    ],
  });
 