<!--
 * @Author: Brightness
 * @Date: 2021-08-05 10:15:21
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-30 09:45:41
 * @Description:  主要外框
-->
<template>
    <div class="home">
        <!-- 顶部 开始 -->
        <div class="header">
            <div class="left">
                <div class="logo">
                    <span class="yellow">Brightness</span>
                    <span class="red">OA</span>
                </div>
                <n-button-group size="small">
                    <router-link to="/home">
                        <md-home class="icon"></md-home>
                    </router-link>
                    <span class="decollator"></span>
                </n-button-group>
            </div>
            <div class="right">
                <n-dropdown
                    @select="accountSelect"
                    trigger="hover"
                    :options="accountOptions"
                >
                    <div class="user">
                        <span class="image">
                            <img :src="account.image" alt="" />
                        </span>
                        <span>{{ account.name }}</span>
                        <span>{{ account.role }}</span>
                    </div>
                </n-dropdown>
            </div>
        </div>
        <!-- 顶部 结束 -->

        <!--************侧边导航 开始****************-->
        <n-space vertical>
            <n-layout has-sider>
                <n-layout-sider
                    bordered
                    collapse-mode="width"
                    :collapsed-width="64"
                    :width="240"
                    :collapsed="collapsed"
                    @collapse="collapsed = true"
                    @expand="collapsed = false"
                >
                    <n-menu
                        :collapsed="collapsed"
                        :collapsed-width="64"
                        :collapsed-icon-size="22"
                        :options="sideMenu"
                        v-model:value="sideMenuActive"
                        @update:value="sideMenuClick"
                    />
                </n-layout-sider>
                <n-layout style="height:90vh;" :native-scrollbar="true">
                    <span>
                        <router-view />
                    </span>
                </n-layout>
            </n-layout>
        </n-space>
        <!--************侧边导航 结束****************-->
    </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from "vue";
import { MdHome, MdMenu, IosArrowDown } from "@vicons/ionicons4";
import router from "@/router";
import { useMessage } from "naive-ui";
import { logout } from "@/utils/tools";
import { apiRequest } from "@/utils/api";

export default defineComponent({
    components: {
        MdHome,
        MdMenu,
        IosArrowDown,
    },
    setup() {
        window.$message = useMessage(); //全局使用信息弹窗

        /*********************** */
        // let refs = reactive({});
        /********非响应式数据************** */
        let values = {
            //账号下拉菜单
            accountOptions: [
                {
                    label: "个人中心",
                    key: "/person/Info",
                },
                {
                    label: "修改密码",
                    key: "/person/Password",
                },
                {
                    label: "退出系统",
                    key: "/",
                },
            ],
        };
        /**********响应式数据*********** */
        let data = reactive({
            //账号信息
            account: {},
            //抽屉是否显示
            drawerActive: false,
            //抽屉菜单
            drawerMenu: [],
            //侧边菜单
            sideMenu: [],
            //侧边菜单是否可以压缩
            collapsed: false,
            //侧边菜单默认展开项
            sideMenuActive: null,
        });

        /********************* */

        /******方法********* */
        let methods = {
            //加载账号信息
            loadAccount() {
                data.account = {
                    name: "Brightness",
                    role: "超级管理员",
                    image:
                        "https://axhub.im/pro/db32a4fa500159f4/images/oa/u623.png",
                };
            },

            //账户下拉菜单选中
            accountSelect(key) {
                if (key == "/") {
                    logout();
                    router.push("/");
                    window.$message.success("退出成功");
                    return;
                }
                router.push(key);
            },

            //加载侧边菜单
            loadSideMenu() {
                apiRequest("account/getAppMenu").then((res) => {
                    if (res) {
                        data.sideMenu = res.data;
                        data.sideMenuActive = router.currentRoute._value.path;
                    }
                });
            },
            //侧边菜单选中
            sideMenuClick(key) {
                router.push(key);
            },
        };

        /**************生命周期************** */
        methods.loadAccount();
        methods.loadSideMenu();

        /***************返回*************** */
        let refData = toRefs(data);
        return {
            // ...refs,
            ...values,
            ...refData,
            ...methods,
        };
    },
});
</script>

<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 60px;
    box-shadow: 1px 1px 3px #ccc;

    .left {
        display: flex;

        .logo {
            font-size: 20px;
            font-weight: bold;
            padding: 0 20px;

            .yellow {
                color: #cccc33;
            }

            .red {
                color: #d04d3c;
            }
        }

        .icon {
            width: 30px;
            height: 30px;
        }

        .decollator {
            border-right: 2px solid #f1f1f1;
            height: 30px;
            margin: 0 10px;
        }

        .button {
            margin: 0 20px;
            cursor: pointer;

            &:hover {
                color: #799e8a;
            }
        }
    }

    .right {
        display: flex;

        .user {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 200px;
            color: #999;
            font-weight: bold;
        }
    }
}

.drawer-menu {
    .title {
        font-size: 16px;
        font-weight: bold;
    }

    .list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px;

        .item {
            width: 80px;
            margin: 10px;
            text-align: center;
            text-decoration: none;
            &:hover {
                cursor: pointer;
            }
            .label {
                color: #666;
            }
        }
    }
}
</style>
