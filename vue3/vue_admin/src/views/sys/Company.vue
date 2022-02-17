<!--
 * @Author: Brightness
 * @Date: 2021-08-10 15:47:27
 * @LastEditors: Brightness
 * @LastEditTime: 2021-09-03 10:49:26
 * @Description:  
-->
<template>
    <div class="company">
        <page-title title="公司信息" />
        <div class="content">
            <div class="left">
                <div class="image">
                    <img
                        v-if="logo"
                        :src="'/api/runtime/storage/' + logo"
                        alt=""
                    />
                    <span v-else>暂无图片</span>
                </div>
                <upload
                    action="Company/uploadLogo"
                    accept=".png,.jpg"
                    @finish="uploadFinish"
                >
                    <n-button type="info">
                        <template #icon>
                            <n-icon>
                                <md-cloud-upload />
                            </n-icon>
                        </template>
                        上传公司LOGO
                    </n-button>
                </upload>
            </div>
            <div class="right">
                <n-form
                    ref="formRef"
                    :model="model"
                    :rules="rules"
                    label-placement="left"
                    :label-width="140"
                >
                    <n-form-item label="公司名称：" path="name">
                        <n-input v-model:value="model.name"></n-input>
                    </n-form-item>
                    <n-form-item label="英文名称：">
                        <n-input v-model:value="model.english"></n-input>
                    </n-form-item>
                    <n-form-item label="总部地址：" path="address">
                        <n-input v-model:value="model.address"></n-input>
                    </n-form-item>
                    <n-form-item label="公司电话：" path="phone">
                        <n-input v-model:value="model.phone"></n-input>
                    </n-form-item>
                    <n-form-item label="公司邮箱：">
                        <n-input v-model:value="model.email"></n-input>
                    </n-form-item>
                    <n-form-item label="法人：" path="legal">
                        <n-input v-model:value="model.legal"></n-input>
                    </n-form-item>
                    <n-form-item label="法人联系方式：" path="legalphone">
                        <n-input v-model:value="model.legalphone"></n-input>
                    </n-form-item>
                    <n-button type="info" block @click="submit"
                        >确认更新</n-button
                    >
                </n-form>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import PageTitle from "@/components/PageTitle.vue";
import Upload from "@/components/Upload.vue";
import { MdCloudUpload } from "@vicons/ionicons4";
import { apiRequest } from "../../utils/api";
export default defineComponent({
    components: {
        PageTitle,
        Upload,
        MdCloudUpload,
    },
    setup() {
        /************************ */
        let refs = reactive({
            formRef: null,
        });

        /**********非响应式数据*********** */
        const values = {
            rules: {
                name: {
                    required: true,
                    message: "需要公司名称",
                    trigger: ["blur"],
                },
                address: {
                    required: true,
                    message: "需要总部地址",
                    trigger: ["blur"],
                },
                phone: {
                    required: true,
                    message: "需要公司电话",
                    trigger: ["blur"],
                },
                legal: {
                    required: true,
                    message: "需要法人",
                    trigger: ["blur"],
                },
                legalphone: {
                    required: true,
                    message: "需要法人联系方式",
                    trigger: ["blur"],
                },
            },
        };

        /*************响应式数据**************** */
        let data = reactive({
            model: {},
            //logo图片
            logo: "",
        });

        /*************************** */
        let methods = {
            //加载公司信息
            loadCompany() {
                apiRequest("Company/getInfo").then((res) => {
                    if (res) {
                        data.model = res.data;
                        data.logo = res.data.logo;
                    }
                });
            },
            //logo上传完成
            uploadFinish(res) {
                if (res) {
                    if (res.errCode == 0) {
                        data.logo = "" + res.data;
                    }
                }
            },
            submit() {
                refs.formRef.validate((err) => {
                    if (!err) {
                        apiRequest("Company/updateInfo", data.model).then(
                            (res) => {
                                if (res) {
                                    methods.loadCompany();
                                }
                            }
                        );
                    }
                });
            },
        };
        /***************************** */
        methods.loadCompany();
        /******************** */
        return {
            ...toRefs(refs),
            ...values,
            ...toRefs(data),
            ...methods,
        };
    },
});
</script>

<style lang="less" scoped>
.company {
    .content {
        display: flex;
        justify-content: space-between;
        .left {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            width: 40%;
            .image {
                height: 200px;
                width: 200px;
                margin: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                color: var(--desc-color);
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .right {
            width: 50%;
            padding: 40px;
            margin-right: 20px;
        }
    }
}
</style>
