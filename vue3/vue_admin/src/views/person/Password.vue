<!--
 * @Author: Brightness
 * @Date: 2021-08-10 09:06:07
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-25 16:41:37
 * @Description:  
-->
<template>
    <div class="password">
        <page-title title="修改密码" />
        <div class="form-box">
            <n-form :model="model" :rules="rules" ref="formRef">
                <n-form-item label="输入原密码：" path="oldPassword">
                    <n-input
                        type="password"
                        v-model:value="model.oldPassword"
                        @keydown.enter.prevent="submit"
                    />
                </n-form-item>
                <n-form-item label="输入新密码：" path="password">
                    <n-input
                        type="password"
                        v-model:value="model.password"
                        @keydown.enter.prevent="submit"
                    />
                </n-form-item>
                <n-form-item label="确认新密码：" path="rePassword">
                    <n-input
                        type="password"
                        v-model:value="model.rePassword"
                        @keydown.enter.prevent="submit"
                    />
                </n-form-item>
            </n-form>
            <n-button type="info" block @click="submit">确认</n-button>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import PageTitle from "@/components/PageTitle.vue";
import { apiRequest } from "@/utils/api";
export default defineComponent({
    components: {
        PageTitle,
    },
    setup() {
        /************************ */
        let formRef = ref(null);
        let model = ref({
            oldPassword: null,
            password: null,
            rePassword: null,
        });
        function validatePasswordSame(rule, value) {
            return value === model.value.password;
        }
        const rules = {
            oldPassword: {
                required: true,
                trigger: ["blur"],
                message: "需要原密码",
            },

            password: {
                required: true,
                trigger: ["blur"],
                message: "需要新密码",
            },
            rePassword: [
                {
                    required: true,
                    trigger: ["blur"],
                    message: "需要确认密码",
                },
                {
                    validator: validatePasswordSame,
                    message: "两次密码输入不一致",
                    trigger: ["blur", "password-input"],
                },
            ],
        };
        /************************* */
        let methods = {
            submit() {
                formRef.value.validate((err) => {
                    if (!err) {
                        apiRequest("account/changePassword", model.value);
                    }
                });
            },
        };
        /*************************** */
        return {
            ...methods,
            model,
            rules,
            formRef,
        };
    },
});
</script>

<style lang="less" scoped>
.password {
    .form-box {
        width: 40%;
        min-width: 400px;
        margin: 20px auto;
    }
}
</style>
