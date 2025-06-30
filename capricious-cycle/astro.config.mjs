// Instrument Sentry before everything else
import './instrument.mjs';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  integrations: [
    tailwind(),
  ],
});