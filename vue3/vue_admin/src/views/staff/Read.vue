<!--
 * @Author: Brightness
 * @Date: 2021-08-10 11:20:42
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-10 14:36:28
 * @Description:  
-->
<template>
    <div class="read">
        <page-title title="员工信息" />
        <n-layout has-sider>
            <n-layout-sider width="180">
                <n-menu
                    :collapsed-width="64"
                    :collapsed-icon-size="22"
                    :options="sideMenu"
                    v-model:value="activeKey"
                    @update:value="sideMenuClick"
                />
            </n-layout-sider>
            <n-layout>
                <div class="content">
                    <n-form inline label-placement="left" :model="searchValue">
                        <n-form-item label="岗位：">
                            <n-input v-model:value="searchValue.job"></n-input>
                        </n-form-item>
                        <n-form-item label="姓名：">
                            <n-input v-model:value="searchValue.name"></n-input>
                        </n-form-item>
                        <n-button type="info">搜索</n-button>
                    </n-form>
                    <!-- 表格 -->
                    <vxe-table
                        border="inner"
                        ref="tableRef"
                        auto-resize
                        highlight-current-row
                        highlight-hover-row
                        height="80%"
                        :data="tableData"
                    >
                        <vxe-column field="id" title="工号"></vxe-column>
                        <vxe-column field="name" title="姓名"></vxe-column>
                        <vxe-column field="dept" title="部门"></vxe-column>
                        <vxe-column field="post" title="岗位"></vxe-column>
                        <vxe-column field="phone" title="联系方式"></vxe-column>
                        <vxe-column
                            field="action"
                            title="操作"
                            width="250"
                            fixed="right"
                        >
                            <template #default="{ row }">
                                <div class="flex">
                                    <n-button
                                        type="info"
                                        size="small"
                                        @click="rowEditEvent(row)"
                                        >完善信息</n-button
                                    >
                                </div>
                            </template>
                        </vxe-column>
                    </vxe-table>
                    <!-- 分页 -->
                    <vxe-pager
                        perfect
                        @page-change="pageChange"
                        v-model:current-page="page.currentPage"
                        v-model:page-size="page.pageSize"
                        :total="page.totalResult"
                        :page-sizes="[
                            10,
                            20,
                            100,
                            { label: '大量数据', value: 1000 },
                            { label: '全量数据', value: -1 },
                        ]"
                        :layouts="[
                            'PrevJump',
                            'PrevPage',
                            'Number',
                            'NextPage',
                            'NextJump',
                            'Sizes',
                            'FullJump',
                            'Total',
                        ]"
                    >
                    </vxe-pager>
                </div>
            </n-layout>
        </n-layout>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import PageTitle from "@/components/PageTitle.vue";
import { renderIcon } from "@/utils/tools";
import { MdMenu } from "@vicons/ionicons4";
export default defineComponent({
    components: {
        PageTitle,
    },
    setup() {
        /************************* */
        let sideMenu = ref([
            {
                label: "财务部",
                key: "person",
                icon: renderIcon(MdMenu),
            },
            {
                label: "人事部",
                key: "person",
                icon: renderIcon(MdMenu),
            },
            {
                label: "开发部",
                key: "dev",
                icon: renderIcon(MdMenu),
            },
        ]);
        let activeKey = ref(null);
        let searchValue = ref({
            job: null,
            name: null,
        });
        let tableData = [
            {
                id: "PM001",
                name: "Brightness",
                dept: "开发部",
                post: "搬砖工",
                phone: "13312341234",
            },
        ];
        let tableRef = ref(null);
        let page = ref({
            currentPage: 1,
            pageSize: 10,
            totalResult: 300,
        });
        /************************** */
        let methods = {
            sideMenuClick(key) {
                // router.push(key);
            },
            rowEditEvent(row) {
                console.log(row.name);
            },
            pageChange({ currentPage, pageSize }) {
                console.log(currentPage, pageSize);
            },
        };

        /************************** */
        return {
            ...methods,
            sideMenu,
            activeKey,
            searchValue,
            tableData,
            tableRef,
            page,
        };
    },
});
</script>

<style lang="less" scoped>
.read {
    .n-layout-sider {
        margin-right: 10px;
    }
    .n-layout--static-positioned {
        background-color: var(--background-color);
    }
    .content {
        width: 100%;
        height: 80vh;
        padding: 20px;
        background-color: #fff;
    }
}
</style>
