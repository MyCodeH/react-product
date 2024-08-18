import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { join } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), './src/assets/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[name]'
  })
  ],
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    }
  },

  server: {
    proxy: {
      '/api': {
        target: 'https://api.imooc-front.lgdsunday.club/',
        changeOrigin: true, // 是否改变源地址
      }
    }
  }
})
