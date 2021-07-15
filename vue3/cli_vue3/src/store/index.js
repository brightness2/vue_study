/*
 * @Author: Brightness
 * @Date: 2021-07-15 08:45:06
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-15 09:18:17
 * @Description:  
 */
import { createStore } from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
export default createStore({
  state,
  mutations,
  actions
  
})
