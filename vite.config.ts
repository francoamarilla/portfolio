import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // ponytail: GitHub Pages sirve el repo bajo /portfolio/; volver a '/' con dominio propio
  base: '/portfolio/',
})
