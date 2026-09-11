import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: 'Comics-Mv-React', // 👈 importante
  plugins: [react()],
});