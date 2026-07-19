import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base is '/<repo>/' in production so the site works on GitHub Pages.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/faisal-amin-portfolio/' : '/',
  server: {
    port: 5173,
  },
}))
