import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // sve sto pocinje sa /api prosledjuje se backendu,
    // pa su frontend i API na istoj adresi (nema CORS-a, kolacici rade)
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
