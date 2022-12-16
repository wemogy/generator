/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
    testTimeout: 120000
  },
  plugins: [
    tsconfigPaths(),
    dts({
      insertTypesEntry: true
    })
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '<%= name %>',
      formats: ['es', 'umd'],
      fileName: format => `index.${format}.js`
    }
  }
});
