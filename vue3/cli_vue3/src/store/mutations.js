/*
 * @Author: Brightness
 * @Date: 2021-07-15 09:09:49
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-15 09:10:12
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