/*
 * @Author: Brightness
 * @Date: 2021-07-13 16:35:12
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-14 12:15:40
 * @Description:  vuex actions
 */
import { INIT_ROUTES, TEST } from "./actionTypes";

export default {
    [TEST]({commit,state},routes){
        commit(TEST,routes);
    },
    [INIT_ROUTES]({ commit,state },routes){
        commit(INIT_ROUTES,routes);
    },
}