
/*
 * @Author: Brightness
 * @Date: 2021-07-14 16:23:08
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-14 16:25:58
 * @Description:  
 */
import { INIT_ROUTES, TEST } from "./actionTypes";

export default {
    [TEST]({ commit,state }){
        commit(TEST);
    },
    [INIT_ROUTES]({ commit,state },routes){
        commit(INIT_ROUTES,routes);
    }

}