<template>
  <h2>{{store.helloWorld}}</h2>
  <h3>{{store.count}}</h3>

  <p>{{helloWorld}}</p>
  <p>{{count}}</p>
  <p>{{phoneHidden}}</p>
</template>

<script lang="ts" setup>
    import {mainStore} from '../store'
    import {storeToRefs} from 'pinia'
    const store = mainStore()
    const {helloWorld,count,phoneHidden } = storeToRefs(store)//解构store数据需要使用 storeToRefs

</script>

