<!--
 * @Author: Brightness
 * @Date: 2021-08-16 17:49:34
 * @LastEditors: Brightness
 * @LastEditTime: 2021-09-03 09:59:20
 * @Description:  
-->
<template>
    <div class="upload">
        <n-upload
            :name="name"
            :action="uploadAction"
            :data="uploadData"
            :multiple="multiple"
            :accept="accept"
            v-model:file-list="fileList"
            @finish="uploadFinish"
            @before-upload="beforeUpload"
            ref="uploadRef"
        >
            <slot></slot>
        </n-upload>
    </div>
</template>
<script>
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import axiosConfig from "@/config/axios";
import { getStorage } from "@/utils/localStorage";
export default defineComponent({
    props: {
        name: {
            type: String,
            default: "file",
        },
        action: {
            type: String,
            default: "",
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        accept: {
            type: String,
            default: undefined,
        },
        param: {
            type: Object,
            default: {},
        },
    },
    setup(props, ctx) {
        /************** */
        let uploadRef = ref(null);
        /************************* */
        let values = {
            uploadAction: "",
        };
        let data = reactive({
            fileList: [],
            uploadData: {},
        });
        if ("development" == process.env.NODE_ENV) {
            values.uploadAction =
                axiosConfig.devPrefix + axiosConfig.baseUrl + props.action;
        } else {
            values.uploadAction =
                axiosConfig.prodPrefix + axiosConfig.baseUrl + props.action;
        }

        data.uploadData = computed(() => {
            props.param.token = getStorage("token");
            return props.param;
        });
        /************************** */
        let methods = {
            beforeUpload(options) {
                let r = true;
                ctx.emit("beforeUpload", options, (val) => {
                    r = val;
                });
                return r;
            },
            uploadFinish(options) {
                let result = JSON.parse(
                    options.event.currentTarget.responseText
                );
                if (result.errCode != 0) {
                    window.$message.error(result.msg);
                } else {
                    result.msg && window.$message.success(result.msg);
                }
                ctx.emit("finish", result);
            },
        };
        /*********生命周期**** */

        /*********************** */
        return {
            ...toRefs(data),
            ...values,
            ...methods,
            uploadRef,
        };
    },
});
</script>
