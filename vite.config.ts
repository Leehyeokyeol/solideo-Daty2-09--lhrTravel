import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포를 위한 base URL 설정
  base: '/solideo-Daty2-09--lhrTravel/',
  server: {
    port: 3000,
    open: true
  }
})
