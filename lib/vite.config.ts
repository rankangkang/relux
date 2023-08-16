import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true
    }),
  ],
  build: {
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@cmkk/flux',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `${format}/index.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
