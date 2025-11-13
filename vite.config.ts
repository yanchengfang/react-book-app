import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api' :{
        target: 'https://mock.apifox.cn/m1/2398938-0-default',
        changeOrigin: true, // 是否改变请求头中的host为目标服务器的host，通常设置为true
        // rewrite: (path) => path.replace(/^\/api/, '') //是否替换api
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // '@api': path.resolve(__dirname, 'src/api'),
      // '@assets': path.resolve(__dirname, 'src/assets'),
      // '@components': path.resolve(__dirname, 'src/components'),
      // '@pages': path.resolve(__dirname, 'src/pages'),
      // '@routes': path.resolve(__dirname, 'src/routes'),
      // '@styles': path.resolve(__dirname, 'src/styles'),
      // '@types': path.resolve(__dirname, 'src/types'),
      // '@utils': path.resolve(__dirname, 'src/utils'),
    }
  }
})
