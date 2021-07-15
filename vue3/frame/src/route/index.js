/*
 * @Author: Brightness
 * @Date: 2021-07-13 15:01:47
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-15 08:57:57
 * @Description:  路由配置
 */
import { createRouter,createWebHashHistory,createWebHistory} from "vue-router";
import routeConfig from '@/config/route.js'

let his = null;
if(routeConfig.mode == 'hash'){
    his = createWebHashHistory();
}else{
    his = createWebHistory();
}

const router = createRouter({
    history:his,
    routes:routeConfig.routes
})
export default router