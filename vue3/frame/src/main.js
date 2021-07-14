/*
 * @Author: Brightness
 * @Date: 2021-07-13 14:55:55
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-14 12:03:26
 * @Description: 入口文件 
 */
import { createApp } from 'vue'
import App from './App.vue'
/**************************************** */
import router from '@/route'
import store from '@/store'
import routeConfig from './config/route'
// 全局路由前置守卫
router.beforeEach(routeConfig.beforeEach);

const app = createApp(App)
app.use(router)//使用路由
app.use(store)//使用store配置
app.mount('#app')
