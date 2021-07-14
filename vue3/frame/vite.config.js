/*
 * @Author: Brightness
 * @Date: 2021-07-13 14:55:55
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-14 09:34:49
 * @Description:  
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  alias: [
    { find: '@', replacement: resolve(__dirname, 'src') }
  ],
  //跨越代理
  server:{
    proxy: {
        '/api': {
            target: 'http://192.168.174.134/',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
        }
    }
  }
  
})
