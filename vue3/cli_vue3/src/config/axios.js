/*
 * @Author: Brightness
 * @Date: 2021-07-15 09:23:20
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-15 09:28:06
 * @Description:  
 */

import router from '@/router'

const axiosConfig = {
    devPrefix : '/api',//开发环境接口前缀,一般用于匹配跨域替换，与proxy的配置一致
    prodPrefix :'/xxx',//生成环境接口前缀
    baseUrl:'/public/',//接口基础路径
    //请求正常拦截操作
    itsRequestSuccess:(config)=>{
        console.log('请求前参数调整');
        // config.params = {...config.params,token:tokenStr};
        return config;
    },
    //请求异常拦截操作
    itsRequestError:(error)=>{
        console.log('接口请求出错');
    },
    //响应正常拦截操作
    itsResponseSuccess:(success)=>{
        if(success.status && success.status === 200){
            let res = success.data;
            console.log('请求成功');
            return res;
    
        }else{
            console.log('请求失败');
            return ;
        }
    },
    //响应异常拦截操作
    itsResponseError:(error)=>{
        let status = error.status;
        if(status == 504 || status == 404){
            console.log('服务器被吃了，囧！');
        }else if(status == 403){
            console.log('权限不足，请联系管理员！');
        }else if(status == 401){
            console.log('尚未登录，请登录！');
            router.replace('/');
        }else{
            console.log('未知错误!');
            // if(error.response.data.msg){
            //     Message.error({message:JSON.stringify(error.response.data.msg)});
            // }else{
            //     Message.error({message:'未知错误!'});
            // }
        }
    },
    
}

export default axiosConfig;