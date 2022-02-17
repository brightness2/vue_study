import {defineStore} from 'pinia'
export const listStore = defineStore('list',{
    state:()=>{
        return {
            list:['小红','小美','胖丫']
        }
    }
})