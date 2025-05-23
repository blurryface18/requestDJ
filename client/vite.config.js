import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/requests': 'https://requestdj-9sap.onrender.com',
      '/dj-name': 'https://requestdj-9sap.onrender.com'
    }
  }
})
