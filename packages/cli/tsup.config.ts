import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  clean: true,
  target: 'node18',
  external: ['prune-systems'],
  banner: {
    js: '#!/usr/bin/env node',
  },
});
