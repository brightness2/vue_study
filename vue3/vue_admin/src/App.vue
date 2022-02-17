<!--
 * @Author: Brightness
 * @Date: 2021-08-05 10:15:21
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-13 09:20:02
 * @Description:  
-->
<template>
    <div>
        <n-message-provider>
            <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
                <router-view />
            </n-config-provider>
        </n-message-provider>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { zhCN, dateZhCN } from "naive-ui";
export default defineComponent({
    setup() {
        return {
            zhCN,
            dateZhCN,
        };
    },
});
</script>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
ul,
li {
    list-style: none;
    margin: 0;
    padding: 0;
}
body {
    margin: 0;
    padding: 0;
}
:root {
    --primary-color: #18a058;
    --border-color: #e4dede;
    --desc-color: #aaa;
    --background-color: #f1f1f1;
    --blue-color: rgb(60, 141, 188);
    --light-orange-color: rgba(251, 246, 239, 1);
    --light-dark-color: #666;
}
.flex {
    display: flex;
    justify-content: space-between;
}
.msg-list {
    .msg-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 10px;
        .title {
            color: #333;
        }
        .name {
            color: var(--blue-color);
        }
        .cate {
            color: var(--desc-color);
        }
        span {
            padding: 0 10px;
        }
    }
}

.button-group {
    display: flex;
    margin: 20px;
    .btn {
        margin-right: 20px;
    }
}
.modal-footer {
    display: flex;
    justify-content: flex-end;
    .btn {
        margin-right: 20px;
    }
}
a {
    text-decoration: none;
    color: unset;
}
</style>
