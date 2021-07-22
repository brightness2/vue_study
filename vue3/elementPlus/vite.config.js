/*
 * @Author: Brightness
 * @Date: 2021-07-13 14:55:55
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-21 10:38:53
 * @Description:  
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
const { resolve } = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
    libs:[
      {
        libraryName: 'element-plus',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`;
        },
        resolveComponent: (name) => {
          return `element-plus/lib/${name}`;
        },
      }
    ]
  })],
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
  },
 
  
})
