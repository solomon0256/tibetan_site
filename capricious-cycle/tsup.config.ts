// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/workers.ts'],
  outDir: 'dist',
  format: ['esm'],
  target: 'es2022',
  splitting: false,
  shims: false,
  clean: true,
});