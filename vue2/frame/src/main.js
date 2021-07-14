/*
 * @Author: Brightness
 * @Date: 2021-07-14 14:47:46
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-14 17:17:59
 * @Description:  
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import routeConfig from './config/route'
import  apiRequest from './utils/api'

Vue.config.productionTip = false

Vue.prototype.apiRequest = apiRequest;//可以this.apiRequest 使用

//全局路由前置守卫
router.beforeEach(routeConfig.beforeEach)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
