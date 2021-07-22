/*
 * @Author: Brightness
 * @Date: 2021-07-13 16:35:42
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-14 12:16:07
 * @Description:  vuex 业务方法
 */
import { INIT_ROUTES, TEST } from "./actionTypes";

export default {
    [TEST](state,routes){
        state.test = 'test state string';
    },
    [INIT_ROUTES](state,routes){
        state.routes = routes;
    },
}