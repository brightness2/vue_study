/*
 * @Author: Brightness
 * @Date: 2021-07-14 08:54:16
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-14 10:37:43
 * @Description:  axios api封装
 */

import axios from 'axios'
import axiosConfig from '@/config/axios'
//响应拦截器
axios.interceptors.response.use(success => {
    return axiosConfig.itsResponseSuccess(success);
},error => {
   return axiosConfig.itsResponseError(error);
});

//请求拦截器
axios.interceptors.request.use(config => {
   return axiosConfig.itsRequestSuccess(config);
},error => {
   return axiosConfig.itsRequestError(error)
});

let prefix = '';//接口前缀
if('development' == process.env.NODE_ENV){//开发环境
      prefix = axiosConfig.devPrefix;

}else{//生产环境
      prefix = axiosConfig.prodPrefix;
}
let base_url = prefix + axiosConfig.baseUrl;

const apiRequest = (url,params=null,method = 'post')=>{
    return axios({
        method:method,
        url:`${base_url}${url}`,
        params:params
    });
}

export default apiRequest;