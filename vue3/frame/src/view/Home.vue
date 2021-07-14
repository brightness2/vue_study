<!--
 * @Author: Brightness
 * @Date: 2021-07-13 15:03:36
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-14 10:53:43
 * @Description:  主页
-->
<template>
  <div id="home">Home {{ $store.state.test }}</div>
  <button @click="setStore">setStore</button>
  <br />
  <span>{{ number }}</span>
  <br />
  <button @click="testRequest">test axios</button>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";
import apiRequest from "@/utils/api";
const store = useStore();

let setStore = () => {
  store.dispatch("test");
};

let testRequest = () => {
  //http://192.168.174.134/public/index/login
  apiRequest("index/login").then((res) => {
    console.log("Home", res);
  });
};

let number = 0;
const data = reactive({
  number,
});
</script>

<style>
</style>