// Instrument Sentry before everything else
import './instrument.mjs';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default {
  integrations: [
    tailwind(),
    cloudflare(),
  ],
};