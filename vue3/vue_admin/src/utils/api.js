/*
 * @Author: Brightness
 * @Date: 2021-07-15 09:21:57
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-26 09:08:56
 * @Description:
 */

import axios from "axios";
import axiosConfig from "@/config/axios";
import { VXETable } from "vxe-table";
//响应拦截器
axios.interceptors.response.use(
    (success) => {
        return axiosConfig.itsResponseSuccess(success);
    },
    (error) => {
        return axiosConfig.itsResponseError(error);
    }
);

//请求拦截器
axios.interceptors.request.use(
    (config) => {
        return axiosConfig.itsRequestSuccess(config);
    },
    (error) => {
        return axiosConfig.itsRequestError(error);
    }
);

const apiRequest = (url, params = null, method = "post") => {
    return axios({
        method: method,
        url: `${url}`,
        params: params,
    });
};

const download = (url, type) => {
    if ("development" == process.env.NODE_ENV) {
        url = "api/runtime/storage/" + url;
    } else {
        url = "/runtime/storage/" + url;
    }
    fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
            // 下载到本地
            let time = new Date().getTime();
            VXETable.saveFile({
                filename: time + Math.ceil(Math.random() * 100),
                type: type,
                content: blob,
            });
        });
};

export { apiRequest, download };
