/*
定义状态容器(仓库)
修改容器(仓库)中的 state
仓库中的 action 的使用
*/

import {defineStore} from 'pinia'
import {listStore} from './list' //第二个仓库
//注意：这里的名字必须唯一，不能重复
export const mainStore = defineStore('main',{
    state:()=>{
        return {
            helloWorld:'Hello World',
            count:0,
            phone:18825146590
        }
    },
    //有缓存特性，数据没变化，不会触发
    getters:{
        //隐藏电话号码
        phoneHidden():string{
            return this.phone.toString().replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')
        }
    },
    actions:{

        changeState(str:string){
            this.count+=3,
            this.helloWorld=str
        },
        getList(){
            console.log(listStore().list);
            
        }
    }
})

/** 
state 属性：用来存储全局的状态的，这里边定义的，就可以是为SPA里全局的状态了。
getters属性：用来监视或者说是计算状态的变化的，有缓存的功能。
actions属性：对state里数据变化的业务逻辑，需求不同，编写逻辑不同。说白了就是修改state全局状态数据的。
 */