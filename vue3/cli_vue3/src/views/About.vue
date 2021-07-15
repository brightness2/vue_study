<!--
 * @Author: Brightness
 * @Date: 2021-07-15 08:45:06
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-15 09:35:03
 * @Description:  
-->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{ $store.state.test }}</div>
    <button @click="testStore">test store</button>
    <br />
    <button @click="testAxios">test axios</button>
  </div>
</template>

<script>
import apiRequest from "@/utils/api";
export default {
  name: "About",
  methods: {
    testStore() {
      this.$store.dispatch("test");
    },
    testAxios() {
      apiRequest("index/login").then((res) => console.log(res));
    },
  },
};
</script>
