/*
 * @Author: Brightness
 * @Date: 2021-08-05 10:15:21
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-06 15:59:35
 * @Description:
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import routeConfig from "@/config/route";

// import {
//     // create naive ui
//     create,
//     // component
//     NButton,
//     NCarousel,
// } from "naive-ui";

// const naive = create({
//     components: [NButton, NCarousel],
// });
import naive from "naive-ui";
import "xe-utils";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";
router.beforeEach(routeConfig.beforeEach);

createApp(App)
    .use(store)
    .use(router)
    .use(naive)
    .use(VXETable)
    .mount("#app");
