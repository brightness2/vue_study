/*
 * @Author: Brightness
 * @Date: 2021-07-15 09:19:31
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-15 09:20:48
 * @Description:  
 */
module.exports = {
    publicPath: '',
    devServer: { 
      proxy: { 
            '/api': { 
                // 此处的写法，目的是为了 将 /api 替换成 自己的域名路径 
                target: 'http://192.168.174.134',//自己的域名路径
                // 允许跨域 
                changeOrigin: true, 
                ws: true, 
                pathRewrite: { 
                    '^/api': ' ' 
                } 
            } 
        },
      
    } 
}