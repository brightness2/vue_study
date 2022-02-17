<!--
 * @Author: Brightness
 * @Date: 2021-08-09 11:10:07
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-09 14:37:05
 * @Description:  
-->
<template>
    <div class="list">
        <page-title title="公告查看" />
        <n-layout has-sider>
            <!-- 侧边菜单 开始 -->
            <n-layout-sider width="180">
                <n-menu @update:value="menuUpdate" :options="menuOptions" />
            </n-layout-sider>
            <!-- 主内容 开始 -->
            <div class="content">
                <!-- 搜索区 -->
                <n-form
                    inline
                    :label-width="80"
                    :model="searchValue"
                    label-placement="left"
                >
                    <!-- <n-form-item label="创建人">
                        <n-input v-model:value="searchValue.user" />
                    </n-form-item> -->
                    <n-form-item label="生效时间">
                        <n-date-picker
                            type="datetime"
                            v-model:value="searchValue.user"
                        />
                    </n-form-item>
                    <n-form-item label="结束时间">
                        <n-date-picker
                            type="datetime"
                            v-model:value="searchValue.user"
                        />
                    </n-form-item>
                    <n-form-item label="公告标题">
                        <n-input v-model:value="searchValue.user" />
                    </n-form-item>
                    <!-- <n-form-item label="公告状态">
                        <n-input v-model:value="searchValue.user" />
                    </n-form-item> -->
                    <n-button type="info" @click="searchClick">搜索</n-button>
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
                    <vxe-column field="title" title="公告标题"></vxe-column>
                    <vxe-column field="category" title="公告类别"></vxe-column>
                    <vxe-column field="status" title="公告状态"></vxe-column>
                    <vxe-column field="start" title="生效日期"></vxe-column>
                    <vxe-column field="end" title="终止日期"></vxe-column>
                    <vxe-column field="user" title="发布人"></vxe-column>
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
            <!-- 主内容 结束 -->
        </n-layout>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import pageTitle from "@/components/PageTitle.vue";
import { renderIcon } from "@/utils/tools";
import { IosCalendar } from "@vicons/ionicons4";
export default defineComponent({
    components: {
        pageTitle,
        IosCalendar,
    },
    setup() {
        /******************* */
        let menuOptions = ref([
            {
                label: "全部公告",
                key: "all",
                icon: renderIcon(IosCalendar),
            },
            {
                label: "公司公告",
                key: "company",
                icon: renderIcon(IosCalendar),
            },
        ]);
        let searchValue = ref({ user: null });
        let tableRef = ref(null);
        let tableData = ref([
            {
                id: 1,
                title: "10月份考勤制度调整",
                category: "公司公告",
                status: "生效中",
                start: "2019-10-7",
                end: "2019-10-9",
                user: "Brightness",
            },
        ]);
        let page = ref({
            currentPage: 1,
            pageSize: 10,
            totalResult: 300,
        });
        /*********************************** */
        let methods = {
            menuUpdate(key) {
                window.$message.success(key);
            },
            searchClick() {
                window.$message.success("search");
            },
            pageChange({ currentPage }) {
                window.$message.success(currentPage);
            },
        };
        /************************* */
        return {
            ...methods,
            menuOptions,
            searchValue,
            tableRef,
            tableData,
            page,
        };
    },
});
</script>

<style lang="less" scoped>
.list {
    background-color: var(--background-color);
    .n-layout {
        background-color: var(--background-color);
    }
    .n-layout-sider {
        margin-right: 10px;
    }
    .content {
        width: 100%;
        padding: 10px;
        background-color: #fff;
    }
}
</style>
