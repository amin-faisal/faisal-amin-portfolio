import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base is '/<repo>/' in production so the site works on GitHub Pages.
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  base: command === 'build' ? '/faisal-amin-portfolio/' : '/',
  build: {
    // Every browser that can run this site supports ES2020 natively. The
    // default target shipped polyfills for Array.prototype.at and Math.trunc.
    target: 'es2020',
  },
  server: {
    port: 5173,
  },
}))
