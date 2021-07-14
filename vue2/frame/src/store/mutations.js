import { INIT_ROUTES, TEST } from "./actionTypes";

/*
 * @Author: Brightness
 * @Date: 2021-07-14 16:25:33
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-14 16:27:03
 * @Description:  
 */
export default {
    [INIT_ROUTES](state,routes){
        state.routes = routes;
    },
    [TEST](state){
        state.test = 'test state string';
    },
}