<!--
 * @Author: Brightness
 * @Date: 2021-08-05 17:55:06
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-25 16:42:08
 * @Description:  
-->
<template>
    <div class="home">
        <!-- 轮播 开始 -->
        <div class="lunbo">
            <n-carousel autoplay>
                <div class="image" v-for="(item, index) in banner" :key="index">
                    <img class="carousel-img" :src="item.path" />
                </div>
            </n-carousel>
        </div>
        <!-- 轮播 结束 -->
        <!-- 公告通知 开始 -->
        <div class="flex">
            <msg-card @more="moreClick" height="300">
                <template #title>
                    <n-icon>
                        <ios-notifications />
                    </n-icon>
                    公告通知
                </template>
                <template #content>
                    <n-tabs type="line">
                        <n-tab-pane name="all" tab="全部">
                            <ul class="msg-list">
                                <li
                                    class="msg-item"
                                    v-for="(notice, index) in notices"
                                    :key="index"
                                >
                                    <div>
                                        <div class="title">
                                            {{ notice.n_title }}
                                        </div>
                                        <div class="cate">
                                            {{ notice.category.nc_name }}
                                        </div>
                                    </div>
                                    <div>{{ notice.update_time }}</div>
                                </li>
                            </ul>
                        </n-tab-pane>
                        <n-tab-pane name="effective" tab="生效中">
                            <ul class="msg-list">
                                <li
                                    class="msg-item"
                                    v-for="(notice, index) in activeNotices"
                                    :key="index"
                                >
                                    <div>
                                        <div class="title">
                                            {{ notice.n_title }}
                                        </div>
                                        <div class="cate">
                                            {{ notice.category.nc_name }}
                                        </div>
                                    </div>
                                    <div>{{ notice.update_time }}</div>
                                </li>
                            </ul>
                        </n-tab-pane>
                        <n-tab-pane name="overdue" tab="已过期">
                            <ul class="msg-list">
                                <li
                                    class="msg-item"
                                    v-for="(notice, index) in pastNotices"
                                    :key="index"
                                >
                                    <div>
                                        <div class="title">
                                            {{ notice.n_title }}
                                        </div>
                                        <div class="cate">
                                            {{ notice.category.nc_name }}
                                        </div>
                                    </div>
                                    <div>{{ notice.update_time }}</div>
                                </li>
                            </ul>
                        </n-tab-pane>
                    </n-tabs>
                </template>
            </msg-card>
            <!-- 公告通知 结束 -->
            <!-- 待我审批 开始 -->
            <msg-card width="650" height="300">
                <template #title>
                    <n-icon>
                        <md-copy />
                    </n-icon>
                    待我审批
                </template>
                <template #content>
                    <ul class="msg-list">
                        <li
                            class="msg-item"
                            v-for="(i, index) in 8"
                            :key="index"
                        >
                            <div class="name">
                                办公用品领用申请_Refrain_2019-10-18
                            </div>
                            <div>
                                <span>Brightness</span>
                                <span>2019-10-18</span>
                            </div>
                        </li>
                    </ul>
                </template>
            </msg-card>

            <!-- 待我审批 结束 -->
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import MsgCard from "@/components/MsgCard.vue";

import { IosNotifications, MdCopy } from "@vicons/ionicons4";
import { apiRequest } from "@/utils/api";
export default defineComponent({
    components: {
        MsgCard,
        IosNotifications,
        MdCopy,
    },
    setup() {
        /************************* */
        let data = reactive({
            banner: [],
            notices: [],
            activeNotices: [],
            pastNotices: [],
        });

        /*************** */
        let methods = {
            //加载轮播图数据
            loadBanner() {
                apiRequest("Console/getHomeBanner").then((res) => {
                    if (res) {
                        data.banner = res.data;
                    }
                });
            },
            //加载最新公告
            loadNotice() {
                apiRequest("Notice/getLast").then((res) => {
                    if (res) {
                        data.notices = res.data;
                        data.activeNotices = res.data.filter(
                            (el) => el.status === 1
                        );
                        data.pastNotices = res.data.filter(
                            (el) => el.status === 0
                        );
                    }
                });
            },

            //加载审批列表

            //
            moreClick() {},
        };

        /*********************** */
        methods.loadBanner();
        methods.loadNotice();
        /************************* */
        return {
            ...toRefs(data),
            ...methods,
        };
    },
});
</script>

<style lang="less" scoped>
.home {
    background-color: var(--background-color);
    padding: 20px;
}
.lunbo {
    margin-bottom: 10px;
    .image {
        width: 100%;
        height: 300px;
        margin: 0 auto;
        img {
            width: 100%;
            // height: 100%;
        }
    }
}
</style>
