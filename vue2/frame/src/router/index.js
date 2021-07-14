/*
 * @Author: Brightness
 * @Date: 2021-07-14 14:47:46
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-14 16:11:55
 * @Description:  
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routeConfig from '@/config/route'
Vue.use(VueRouter)

const router = new VueRouter({
  mode:routeConfig.mode,
  base: process.env.BASE_URL,
  routes:routeConfig.routes
})

export default router
