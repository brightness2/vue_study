<!--
 * @Author: Brightness
 * @Date: 2021-08-05 10:15:21
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-25 16:39:41
 * @Description:  登录页
-->

<template>
    <div class="login">
        <!-- 轮播区 开始 -->
        <div class="lunbo">
            <n-carousel autoplay>
                <img
                    v-for="(i, index) in carouselImage"
                    :key="index"
                    :src="i"
                    alt=""
                    class="carousel-img"
                />
            </n-carousel>
        </div>
        <!-- 轮播区 结束 -->
        <!-- 登录表单 开始 -->
        <div class="form">
            <h1>Login</h1>
            <h3 class="desc-text">Welcome Back!</h3>
            <n-form
                :model="model"
                ref="formRef"
                :rules="rules"
                label-placement="left"
                label-align="right"
                label-width="100"
            >
                <n-form-item path="name" label="用户名称：">
                    <n-input
                        v-model:value="model.name"
                        @keydown.enter.prevent="submit"
                        placeholder="请输入名称"
                    />
                </n-form-item>
                <n-form-item path="password" label="密码：">
                    <n-input
                        type="password"
                        v-model:value="model.password"
                        @keydown.enter.prevent="submit"
                        placeholder="请输入密码"
                    />
                </n-form-item>
            </n-form>
            <n-button type="info" size="large" block @click="submit"
                >登录</n-button
            >
        </div>
        <!-- 登录表单 结束 -->
    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import router from "@/router";
import { apiRequest } from "@/utils/api";
import { login } from "@/utils/tools";
export default defineComponent({
    setup() {
        /********** */
        let formRef = ref(null);
        let model = ref({
            name: null,
            password: null,
        });
        let carouselImage = ref([]);
        const rules = {
            name: [
                {
                    required: true,
                    trigger: ["blur"],
                    message: "请输入名称",
                },
            ],
            password: [
                {
                    required: true,
                    message: "请输入密码",
                    trigger: ["blur"],
                },
            ],
        };

        /******************** */
        let methods = {
            //加载轮播图片
            loadImage() {
                carouselImage.value = [
                    "https://img1.baidu.com/it/u=3805604810,525058401&fm=224&fmt=auto&gp=0.jpg",
                    "https://img1.baidu.com/it/u=4026984696,2516986514&fm=26&fmt=auto&gp=0.jpg",
                ];
            },
            //登录按钮点击事件
            submit() {
                formRef.value.validate((err) => {
                    if (!err) {
                        apiRequest("account/login", model.value).then((res) => {
                            if (!res) {
                                return;
                            }
                            login(
                                res.data.user_id,
                                res.data.name,
                                res.data.token
                            );
                            router.push("home");
                        });
                    }
                });
            },
        };
        /*********************************** */
        onMounted(() => {
            methods.loadImage();
        });
        /****************** */
        return {
            formRef,
            model,
            carouselImage,
            rules,
            ...methods,
        };
    },
});
</script>

<style lang="less" scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    .lunbo {
        flex: 1;
        height: 100vh;
        .carousel-img {
            width: 100%;
            height: 100vh;
        }
    }
    .form {
        flex: 1;
        padding: 0 140px;
        .desc-text {
            color: #666;
        }
    }
}
</style>
