import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
import routeConfig from '@/config/route'

let his = null;
if(routeConfig.mode == 'hash'){
    his = createWebHashHistory();
}else{
    his = createWebHistory();
}



const router = createRouter({
  history: his,
  routes:routeConfig.routes
})

export default router
