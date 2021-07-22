/*
 * @Author: Brightness
 * @Date: 2021-07-14 09:47:40
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-21 16:40:36
 * @Description:  axios 配置
 */
import router from '@/route'
import { ElMessage } from 'element-plus';
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
            
            if(res.errCode != 0){
                ElMessage.error(res.msg);
            }else{
                res.msg&&ElMessage.success(res.msg);
            }
            return res;
        }else{
            ElMessage.error('请求失败');
            return ;
        }
    },
    //响应异常拦截操作
    itsResponseError:(error)=>{
        let status = error.status;
        if(status == 504 || status == 404){
            ElMessage.error('服务器被吃了，囧！');
        }else if(status == 403){
            ElMessage.error('权限不足，请联系管理员！');
        }else if(status == 401){
            ElMessage.error('尚未登录，请登录！');
            router.replace('/');
        }else{
            ElMessage.error('未知错误!');
           
        }
    },
    
}

export default axiosConfig;