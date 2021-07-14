/*
 * @Author: Brightness
 * @Date: 2021-07-14 14:47:46
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-14 16:27:48
 * @Description:  
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions
})
