import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";


export default defineConfig({
    envPrefix: ['PUBLIC_', 'ASTRO_'],
    integrations: [tailwind()],
});