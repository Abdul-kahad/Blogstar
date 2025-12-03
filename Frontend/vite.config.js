import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Vercel expects the build output to be in 'dist' by default.
    // Changing this ensures Vite puts the optimized files where Vercel looks.
    outDir: 'dist'
  }
})