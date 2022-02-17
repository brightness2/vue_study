<template>
  <div>
      <button @click="handleClick">加一</button>
      <button @click="handleClickPatch">修改数据($patch)</button>
      <button @click="handleClickActions">修改数据(actions)</button>
      <button @click="handleClickChangePhone">修改手机号</button>
      <button @click="handleClickList">listStore list数据</button>

  </div>
</template>

<script lang="ts" setup>
    import {mainStore} from '../store'
    const store = mainStore()
    const handleClick = ()=>{
        store.count++;
    }
    //使用$patch修改多条数据
    const handleClickPatch = ()=>{
        store.$patch({
            helloWorld:'Hello Brightness',
            count:store.count + 2
        })
    }
    //修改的过程非常复杂，你可以先在store里，定义好actions中的函数，然后在组件里再调用函数。
    const handleClickActions = ()=>{
        store.changeState('Brightness')
    }
    const handleClickChangePhone = ()=>{
        store.phone = 18849457485
    }
    const handleClickList = ()=>{
        store.getList()
    }
</script>

<style>

</style>