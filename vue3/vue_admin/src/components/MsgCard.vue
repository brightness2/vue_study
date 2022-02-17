<!--
 * @Author: Brightness
 * @Date: 2021-08-06 09:18:32
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-06 14:20:25
 * @Description:  
-->
<template>
    <div
        class="msg-card"
        :style="'width:' + width + 'px;height:' + height + 'px;'"
    >
        <div class="header">
            <div class="title">
                <slot name="title"></slot>
            </div>
            <div class="more" @click="moreClick">
                <n-icon size="22">
                    <ios-more></ios-more>
                </n-icon>
            </div>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { IosMore } from "@vicons/ionicons4";
export default defineComponent({
    components: {
        IosMore,
    },
    props: {
        width: {
            type: String,
            default: "500",
        },
        height: {
            type: String,
            default: "400",
        },
    },
    setup(props, ctx) {
        /*************************** */
        let methods = {
            moreClick() {
                ctx.emit("more");
            },
        };

        /****************************** */
        return {
            ...methods,
        };
    },
});
</script>

<style lang="less" scoped>
.msg-card {
    // border: 1px solid var(--border-color);
    overflow: hidden;
    background-color: #fff;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid var(--border-color);
        font-size: 16px;
        font-weight: bold;
        color: var(--primary-color);
    }
}
</style>
