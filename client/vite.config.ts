import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@constants': path.resolve(__dirname, './src/constants'),
      "@interfaces": path.resolve(__dirname, './src/interfaces'),
      "@store": path.resolve(__dirname, './src/store'),
      "@reducer": path.resolve(__dirname, './src/store/reducer'),
      "@service": path.resolve(__dirname, './src/service'),
      "@axios": path.resolve(__dirname, './src/axios'),
    }
  }
})
