import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
//创建pinia实例
const pinia = createPinia()
createApp(App).use(pinia).mount('#app')
