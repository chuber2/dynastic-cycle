import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
    port: 8080,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
