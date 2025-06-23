import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),

    
    react()],
  define: {
    __ROUTER_PROMPT_FUTURE_NON_COMPATIBLE_API: true,
  },
  build: {
    rollupOptions: {
      external: ['react-router-dom'],
    },
  },
})
