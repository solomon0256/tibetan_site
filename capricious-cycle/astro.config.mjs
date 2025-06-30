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
  vite: {
    // Leave public JS and CSS files untouched so they can be loaded directly
    assetsInclude: ['**/*.js', '**/*.css'],
  },
});