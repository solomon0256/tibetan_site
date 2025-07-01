import { build } from 'esbuild';

build({
  entryPoints: ['src/workers.ts'],
  outfile: 'dist/worker.mjs',
  bundle: true,
  format: 'esm',
  target: 'esnext',
  platform: 'neutral',
}).catch(() => process.exit(1));