<!--
 * @Author: Brightness
 * @Date: 2021-08-09 10:01:18
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-09 11:07:28
 * @Description:  
-->
<template>
    <div class="home-banner">
        <page-title title="首页轮播"></page-title>
        <div class="button-group">
            <n-button type="info">添加</n-button>
            <n-button type="info">保存</n-button>
        </div>
        <div
            class="banner-box"
            v-for="(item, index) in bannerList"
            :key="index"
        >
            <div class="left">
                <n-button type="warning" class="btn">删除</n-button>
                <n-button class="btn" type="info">上移</n-button>
                <n-button class="btn" type="info">下移</n-button>
            </div>
            <div class="right">
                <div class="title">编辑轮播属性</div>
                <div class="banner">
                    <n-icon size="30">
                        <ios-add-circle-outline />
                    </n-icon>
                    <span>点击添加图片</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import pageTitle from "@/components/PageTitle.vue";
import { IosAddCircleOutline } from "@vicons/ionicons4";
export default defineComponent({
    components: {
        pageTitle,
        IosAddCircleOutline,
    },
    setup() {
        /******************* */
        let bannerList = ref([
            {
                order: 1,
                name: "ll",
            },
            {
                order: 2,
                name: "tt",
            },
        ]);

        /*********************** */
        return {
            bannerList,
        };
    },
});
</script>

<style lang="less" scoped>
.home-banner {
    .button-group {
        width: 140px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    }

    .banner-box {
        width: 80%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px auto;
        .left {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .btn {
                margin: 10px;
            }
        }
        .right {
            width: 100%;
            border: 1px solid var(--border-color);
            .title {
                text-align: left;
                padding: 10px;
                margin-bottom: 10px;
                font-size: 14px;
                font-weight: bold;
                border-bottom: 1px solid var(--border-color);
            }
            .banner {
                width: 500px;
                height: 200px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border: 1px solid var(--border-color);
                margin-left: 10px;
                margin-bottom: 10px;
                cursor: pointer;
            }
        }
    }
}
</style>
