import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Essential for GitHub Pages deployment where 'Blogstar' is the repo name
  base: '/Blogstar/', 
})