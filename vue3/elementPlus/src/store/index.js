/*
 * @Author: Brightness
 * @Date: 2021-07-13 16:35:20
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-13 17:33:26
 * @Description:  vuex 入口
 */

import {createStore } from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
export default createStore({
    state,
    mutations,
    actions
})