<!--
 * @Author: Brightness
 * @Date: 2021-07-14 14:47:46
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-14 16:59:57
 * @Description:  
-->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{ $store.state.test }}</div>
    <button @click="testStore">test store</button>
    <button @click="testAxios">test axios</button>
  </div>
</template>
<script>
export default {
  name: "About",
  methods: {
    testStore() {
      this.$store.dispatch("test");
    },
    testAxios() {
      this.apiRequest("index/login").then((res) => {
        console.log("about", res);
      });
    },
  },
};
</script>
