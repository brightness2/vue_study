<!--
 * @Author: Brightness
 * @Date: 2021-08-13 17:27:46
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-27 16:48:49
 * @Description:  
-->
<template>
    <div class="detail">
        <page-title title="公告详情" />
        <div>
            {{ resultData.n_title }}-{{ resultData.category.nc_name }}
            <br />
            {{ resultData.n_content }}
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import PageTitle from "@/components/PageTitle.vue";
import { useRoute } from "vue-router";
import { apiRequest } from "../../utils/api";
import router from "@/router";
export default defineComponent({
    components: {
        PageTitle,
    },
    setup() {
        const route = useRoute();

        console.log(route.params.id);

        /***********非响应式数据********** */
        /********响应式数据************ */
        let data = reactive({
            resultData: {
                category: {},
                createUser: {},
            },
        });
        /************************* */
        const methods = {
            loadData(id) {
                apiRequest("notice/get", { n_id: id }).then((res) => {
                    if (res) {
                        data.resultData = res.data;
                    } else {
                        router.back();
                    }
                });
            },
        };
        /************生命周期************ */

        methods.loadData(route.params.id);

        /****************************** */
        return {
            ...toRefs(data),
            ...methods,
        };
    },
});
</script>

<style lang="less" scoped></style>
