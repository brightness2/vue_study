<!--
 * @Author: Brightness
 * @Date: 2021-08-09 15:16:12
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-26 14:41:21
 * @Description:  
-->
<template>
    <div class="category">
        <page-title title="公告类别"></page-title>
        <div class="button-group">
            <n-button class="btn" type="info" @click="addCategory"
                >新建分类</n-button
            >
            <n-button class="btn" @click="deleteCategory">删除</n-button>
        </div>
        <vxe-table
            border="inner"
            ref="tableRef"
            auto-resize
            highlight-current-row
            highlight-hover-row
            height="75%"
            :data="tableData"
        >
            <vxe-column type="checkbox" width="60"></vxe-column>
            <vxe-column field="nc_name" title="分类名称"></vxe-column>
            <vxe-column field="noticeNumber" title="公告数量"></vxe-column>
            <vxe-column field="action" title="操作" width="200" fixed="right">
                <template #default="{ row }">
                    <div class="flex">
                        <n-button type="info" @click="rowEdit(row)"
                            >编辑</n-button
                        >
                        <n-button type="info" @click="rowDelete(row)"
                            >删除</n-button
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
        <!-- 表单 -->
        <n-modal v-model:show="showModal" :mask-closable="false">
            <n-card
                style="width: 600px;"
                title="新增公告类别"
                :bordered="false"
            >
                <n-form
                    ref="formRef"
                    inline
                    :label-width="80"
                    :model="formValue"
                    label-placement="left"
                    :rules="rules"
                >
                    <n-form-item label="分类名称" path="nc_name">
                        <n-input
                            v-model:value="formValue.nc_name"
                            placeholder="输入姓名"
                        />
                    </n-form-item>
                </n-form>
                <div class="form-button">
                    <n-button class="btn" @click="showModal = false"
                        >取消</n-button
                    >
                    <n-button class="btn" type="info" @click="submit"
                        >确定</n-button
                    >
                </div>
            </n-card>
        </n-modal>
    </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from "vue";
import PageTitle from "@/components/PageTitle.vue";
import { zMessage, pagination } from "@/utils/tools";
import { apiRequest } from "@/utils/api";
import { VXETable } from "vxe-table";
export default defineComponent({
    components: {
        PageTitle,
    },
    setup() {
        /****************************** */
        let refs = reactive({
            tableRef: null,
            formRef: null,
        });
        /*******非响应式数据********* */
        const values = {
            rules: {
                nc_name: {
                    required: true,
                    message: "分类名称不能为空",
                    trigger: ["blur"],
                },
            },
        };
        /*********响应式数据********** */
        let data = reactive({
            resultData: [],
            tableData: [],
            page: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0,
            },
            showModal: false,
            formValue: {},
            formAction: "",
        });

        /********************************** */
        let methods = {
            //加载表格数据
            loadTableData() {
                apiRequest("Notice/getCategoryList").then((res) => {
                    if (res) {
                        data.page.currentPage = 1;
                        data.page.totalResult = res.data.length;
                        data.tableData = pagination(
                            data.page.currentPage,
                            data.page.pageSize,
                            res.data
                        );
                    }
                });
            },
            //添加分类
            addCategory() {
                data.formValue = {};
                data.formAction = "Notice/createCategory";
                data.showModal = true;
            },
            //获取表格选中数据
            getTableSelect() {
                let keys = [];
                let rows = refs.tableRef.getCheckboxRecords();
                if (rows.length <= 0) {
                    return false;
                }
                for (const i in rows) {
                    if (Object.hasOwnProperty.call(rows, i)) {
                        const row = rows[i];
                        keys.push(row.nc_id);
                    }
                }
                return keys;
            },
            //批量删除
            deleteCategory() {
                let keys = methods.getTableSelect();
                if (!keys) {
                    zMessage("请勾选分类", "warning");
                    return;
                }
                VXETable.modal
                    .confirm("确定要删除" + keys.length + "个分类吗？")
                    .then((action) => {
                        if (action == "confirm") {
                            apiRequest("Notice/deleteCategories", {
                                keys,
                            }).then((res) => {
                                if (res) {
                                    methods.loadTableData();
                                }
                            });
                        }
                    });
            },
            //行编辑
            rowEdit(row) {
                apiRequest("Notice/getCategory", { nc_id: row.nc_id }).then(
                    (res) => {
                        if (res) {
                            data.formValue = res.data;
                            data.formAction = "Notice/updateCategory";
                            data.showModal = true;
                            methods.loadTableData();
                        }
                    }
                );
            },
            //行删除
            rowDelete(row) {
                VXETable.modal
                    .confirm("确定要删除 " + row.nc_name + " 分类")
                    .then((action) => {
                        if (action == "confirm") {
                            apiRequest("Notice/deleteCategories", {
                                keys: row.nc_id,
                            }).then((res) => {
                                if (res) {
                                    methods.loadTableData();
                                }
                            });
                        }
                    });
            },
            //分页点击
            pageChange({ currentPage, pageSize }) {
                data.tableData = pagination(
                    currentPage,
                    pageSize,
                    data.resultData
                );
            },
            //提交表单
            submit() {
                refs.formRef.validate((err) => {
                    if (!err) {
                        apiRequest(data.formAction, data.formValue).then(
                            (res) => {
                                if (res) {
                                    methods.loadTableData();
                                    data.showModal = false;
                                }
                            }
                        );
                    }
                });
            },
        };
        /*************生命周期*************** */
        methods.loadTableData();
        /************************ */
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
.category {
    .button-group {
        display: flex;
        padding: 10px;
        .btn {
            margin-right: 10px;
        }
    }
}
.form-button {
    display: flex;
    justify-content: flex-end;
    .btn {
        margin-right: 10px;
    }
}
</style>
