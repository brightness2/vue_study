/*
 * @Author: Brightness
 * @Date: 2021-07-15 09:09:01
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-15 09:17:37
 * @Description:  vuex action
 */

import { TEST ,INIT_ROUTES} from "./actionTypes";

export default {
    [TEST]({commit,state},routes){
        commit(TEST,routes);
    },
    [INIT_ROUTES]({ commit,state },routes){
        commit(INIT_ROUTES,routes);
    },
}