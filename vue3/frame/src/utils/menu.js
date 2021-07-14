/*
 * @Author: Brightness
 * @Date: 2021-07-14 12:18:58
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-14 12:20:52
 * @Description:  动态路由
 */
import { INIT_ROUTES } from '@/store/actionTypes';
import apiRequest from "@/utils/api";

export const initMenu = (router,store)=>{
    if(store.state.routes.length>0){
        return;
    }
    apiRequest('Console.getRoutes').then(res=>{
        if(res){
            // 格式化路由
            let fmtRoutes = formatRoutes(res);
            // 添加路由
         
            router.addRoutes(fmtRoutes);

            // 存储路由到vuex
            store.dispatch(INIT_ROUTES, fmtRoutes);
            
        }
    });
}


/**
 * 格式化路由数据
 * @param {*} data 
 * @returns 
 */
 export const formatRoutes = (data=[])=>{
    let fmtRoutes = [];
    data.forEach(route=>{
       
        let { children,component } = route;
        let fmt = route;
        //递归
        if(children && children instanceof Array){
           children = formatRoutes(children);
        }
        //处理 children ,component 的值
        fmt.children = children;
        if(component){
            fmt.component = () => import('@/views/'+component+'.vue');
        }
        fmtRoutes.push(fmt);

    });
    
    return fmtRoutes;

}