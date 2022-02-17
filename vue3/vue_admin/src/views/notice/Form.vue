<!--
 * @Author: Brightness
 * @Date: 2021-08-09 16:38:29
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-10 08:59:01
 * @Description:  
-->
<template>
    <div class="form">
        <page-title title="发布公告"></page-title>
        <div class="form-box">
            <n-form
                :label-width="80"
                :model="noticeValue"
                label-placement="left"
            >
                <n-form-item label="发布人：">
                    {{ noticeValue.user }}
                </n-form-item>
                <n-form-item label="公告类别：">
                    <n-select
                        :options="categoryOptions"
                        v-model:value="noticeValue.category"
                    />
                </n-form-item>
                <n-form-item label="标题：">
                    <n-input v-model:value="noticeValue.name" />
                </n-form-item>
                <n-form-item label="生效日期：">
                    <n-date-picker
                        type="datetime"
                        v-model:value="noticeValue.start"
                    />
                    <span class="span-text">至</span>
                    <n-date-picker
                        type="datetime"
                        v-model:value="noticeValue.end"
                    />
                </n-form-item>
                <n-form-item label="公告内容：">
                    <n-input type="textarea" v-model:value="noticeValue.name" />
                </n-form-item>
            </n-form>
            <n-button type="info">发送</n-button>
        </div>
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
        /******************** */
        let noticeValue = ref({
            user: "Brightness",
            category: null,
            name: null,
            start: null,
            end: null,
        });
        let categoryOptions = ref([
            {
                label: "公司公告",
                value: "company",
            },
            {
                label: "活动公告",
                value: "activity",
            },
        ]);
        /*************************** */
        let methods = {};
        /*************** */
        return {
            ...methods,
            noticeValue,
            categoryOptions,
        };
    },
});
</script>

<style lang="less" scoped>
.form {
    .span-text {
        margin: 0 10px;
    }
    .form-box {
        width: 60%;
        padding: 20px;
        margin: 0 auto;
    }
}
</style>
