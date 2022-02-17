<!--
 * @Author: Brightness
 * @Date: 2021-08-06 13:38:07
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-06 14:18:52
 * @Description:  
-->
<template>
    <div class="list">
        <n-grid
            :x-gap="4"
            :y-gap="12"
            cols="1 l:2 xl:2 2xl:3"
            responsive="screen"
        >
            <n-grid-item v-for="(item, index) in 6" :key="index">
                <msg-card>
                    <template #title>
                        <n-icon>
                            <md-pricetag />
                        </n-icon>
                        人事制度
                    </template>
                    <template #content>
                        <ul class="msg-list">
                            <li
                                class="msg-item"
                                v-for="(i, index) in 10"
                                :key="index"
                            >
                                <div class="name">公司员工行为规范守则</div>
                                <div>人事制度</div>
                                <div>Brightness</div>
                                <div>2019-07-22 14:55</div>
                            </li>
                        </ul>
                    </template>
                </msg-card>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import MsgCard from "@/components/MsgCard.vue";
import { MdPricetag } from "@vicons/ionicons4";
export default defineComponent({
    components: {
        MsgCard,
        MdPricetag,
    },
    setup() {},
});
</script>

<style lang="less" scoped>
.list {
    padding: 10px;
    background-color: var(--background-color);
}
</style>
