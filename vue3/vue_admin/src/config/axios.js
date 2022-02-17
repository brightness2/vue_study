/*
 * @Author: Brightness
 * @Date: 2021-07-15 09:23:20
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-24 17:23:26
 * @Description:
 */

import router from "@/router";
import { getStorage, setStorage } from "@/utils/localStorage";
import { zMessage } from "@/utils/tools";
const axiosConfig = {
    devPrefix: "/api", //开发环境接口前缀,一般用于匹配跨域替换，与proxy的配置一致
    prodPrefix: "/xxx", //生成环境接口前缀
    baseUrl: "/public/index.php/", //接口基础路径
    //请求正常拦截操作
    itsRequestSuccess: (config) => {
        if (getStorage("token")) {
            config.headers.token = getStorage("token");
        }
        let prefix = ""; //接口前缀
        if ("development" == process.env.NODE_ENV) {
            //开发环境
            prefix = axiosConfig.devPrefix;
        } else {
            //生产环境
            prefix = axiosConfig.prodPrefix;
        }
        let base_url = prefix + axiosConfig.baseUrl;
        config.url = base_url + config.url;
        return config;
    },
    //请求异常拦截操作
    itsRequestError: (error) => {
        console.log("接口请求出错");
    },
    //响应正常拦截操作
    itsResponseSuccess: (success) => {
        if (success.status && success.status === 200) {
            let res = success.data;

            if (res.errCode != 0) {
                res.msg && zMessage(res.msg, "error");
                if (res.errCode == 403) {
                    zMessage("请重新登录", "warning");
                    router.push("/");
                }
                return;
            }
            if (res.newToken) {
                setStorage("token", res.newToken);
            }
            res.msg && zMessage(res.msg, "success");

            return res;
        } else {
            return;
        }
    },
    //响应异常拦截操作
    itsResponseError: (error) => {
        // let status = error.status;
        // if (status == 504 || status == 404) {
        //     console.log("服务器被吃了，囧！");
        // } else if (status == 403) {
        //     console.log("权限不足，请联系管理员！");
        // } else if (status == 401) {
        //     console.log("尚未登录，请登录！");
        //     router.replace("/");
        // } else {
        //     console.log("未知错误!");
        //     // if(error.response.data.msg){
        //     //     Message.error({message:JSON.stringify(error.response.data.msg)});
        //     // }else{
        //     //     Message.error({message:'未知错误!'});
        //     // }
        // }
    },
};

export default axiosConfig;
