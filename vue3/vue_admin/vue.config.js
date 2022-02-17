/*
 * @Author: Brightness
 * @Date: 2021-08-16 11:11:25
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-16 11:11:36
 * @Description:
 */
module.exports = {
    publicPath: "",
    devServer: {
        proxy: {
            "/api": {
                // 此处的写法，目的是为了 将 /api 替换成 自己的域名路径
                target: "http://192.168.174.135", //自己的域名路径
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/api": " ",
                },
            },
        },
    },
};
