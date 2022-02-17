<!--
 * @Author: Brightness
 * @Date: 2021-08-10 14:38:54
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-13 09:53:18
 * @Description:  
-->
<template>
    <div class="info">
        <page-title title="员工信息" />
        <div class="button-group">
            <n-button type="info" @click="submit">保存</n-button>
        </div>
        <n-form
            ref="formRef"
            label-placement="left"
            :model="model"
            :rules="rules"
        >
            <div class="title">基本信息</div>
            <div class="area">
                <n-form-item label="工号：">
                    <n-input v-model:value="model.id"></n-input>
                </n-form-item>
                <n-form-item label="姓名：" path="name">
                    <n-input v-model:value="model.name"></n-input>
                </n-form-item>
            </div>
            <div class="area">
                <n-form-item label="部门：" path="dept">
                    <n-input v-model:value="model.dept"></n-input>
                </n-form-item>
            </div>
        </n-form>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import PageTitle from "@/components/PageTitle.vue";
export default defineComponent({
    components: {
        PageTitle,
    },
    setup() {
        /*********************** */
        let formRef = ref(null);
        let model = ref({
            id: null,
            name: null,
            dept: null,
        });
        const rules = {
            name: {
                required: true,
                message: "需要姓名",
                trigger: ["blur"],
            },
            dept: {
                required: true,
                message: "需要部门",
                trigger: ["blur"],
            },
        };
        /*********************** */
        let methods = {
            submit() {
                formRef.validate((err) => {
                    if (!err) {
                        window.$message.success("提交表单");
                    }
                });
            },
        };

        /*************************** */
        return {
            ...methods,
            formRef,
            model,
            rules,
        };
    },
});
</script>

<style lang="less" scoped>
.info {
    padding: 20px 0;
    .button-group {
        display: flex;
        padding: 0 20px;
        margin: 10px 0;
    }
    .title {
        display: block;
        padding: 10px;
        background-color: var(--light-orange-color);
        text-align: left;
        color: var(--light-dark-color);
        margin: 0 20px 20px 20px;
    }
    .area {
        width: 50%;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
    }
}
</style>
