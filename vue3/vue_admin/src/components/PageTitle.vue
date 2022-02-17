<!--
 * @Author: Brightness
 * @Date: 2021-08-06 14:42:14
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-06 14:53:50
 * @Description:  
-->
<template>
    <div class="page-title">{{ title }}</div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        title: String,
    },
    setup() {},
});
</script>

<style lang="less" scoped>
.page-title {
    height: 40px;
    text-align: left;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    background-color: var(--background-color);
}
</style>
