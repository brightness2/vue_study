/*
 * @Author: Brightness
 * @Date: 2021-07-15 08:45:06
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-15 09:36:29
 * @Description:  
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/******************** */
import routeConfig from '@/config/route'
//全局路由前置守卫
router.beforeEach(routeConfig.beforeEach)

const app = createApp(App);
app.use(store).use(router).mount('#app')
