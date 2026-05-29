import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import {tanstackRouter} from '@tanstack/router-plugin/vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
    port: 8080,
  },
  plugins: [tanstackRouter({target: 'react', autoCodeSplitting: true}), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
