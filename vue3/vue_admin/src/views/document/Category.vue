<!--
 * @Author: Brightness
 * @Date: 2021-08-13 15:28:39
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-25 16:40:38
 * @Description:  
-->
<template>
    <div class="category">
        <page-title title="文档分类管理" />
        <div class="button-group">
            <n-button class="btn" type="info" @click="addClick">增加</n-button>
        </div>
        <!-- 表格 -->
        <vxe-table
            border="inner"
            ref="tableRef"
            auto-resize
            highlight-current-row
            highlight-hover-row
            height="70%"
            :data="tableData"
        >
            <vxe-column field="dc_name" title="分类名称"></vxe-column>
            <vxe-column field="parent.dc_name" title="上级分类"></vxe-column>
            <vxe-column field="dc_memo" title="备注"></vxe-column>

            <vxe-column field="action" title="操作" width="140" fixed="right">
                <template #default="{ row }">
                    <div class="flex">
                        <n-button
                            type="info"
                            size="small"
                            @click="rowEditEvent(row)"
                            >编辑</n-button
                        >
                        <n-button
                            type="info"
                            size="small"
                            @click="rowDeleteEvent(row)"
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
        <!-- 模态框 -->
        <n-modal v-model:show="showModal" :mask-closable="false">
            <n-card style="width: 600px;" title="增加分类" :bordered="false">
                <n-form ref="formRef" :model="model" :rules="rules">
                    <n-form-item label="分类名称" path="dc_name">
                        <n-input v-model:value="model.dc_name"></n-input>
                    </n-form-item>
                    <n-form-item label="上级分类">
                        <n-select
                            v-model:value="model.dc_pid"
                            :options="categoryOptions"
                        ></n-select>
                    </n-form-item>
                    <n-form-item label="备注">
                        <n-input v-model:value="model.dc_memo"></n-input>
                    </n-form-item>
                </n-form>
                <div class="modal-footer">
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
import { defineComponent, reactive, toRefs } from "vue";
import PageTitle from "@/components/PageTitle.vue";
import { apiRequest } from "@/utils/api";
import { pagination, parseTreeData } from "@/utils/tools";
import { VXETable } from "vxe-table";
export default defineComponent({
    components: {
        PageTitle,
    },
    setup() {
        /******************** */
        let refs = reactive({
            tableRef: null,
            formRef: null,
        });
        /*******非响应式数据******* */
        const values = {
            rules: {
                dc_name: {
                    required: true,
                    message: "需要分类名称",
                    trigger: ["blur"],
                },
            },
        };
        /********响应式数据*************** */
        let data = reactive({
            //
            resultData: [],
            //表格数据
            tableData: [],
            //分页数据
            page: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0,
            },
            //模态框是否显示
            showModal: false,
            //表单数据
            model: {},
            //表单提交路径
            formAction: "",
            //父级分类下拉选择项
            categoryOptions: [],
        });
        /********方法************** */
        const methods = {
            //加载表格数据
            loadTableData() {
                apiRequest("Document/getCategoryList").then((res) => {
                    if (res) {
                        data.resultData = res.data;
                        data.page.currentPage = 1;
                        data.page.totalResult = res.data.length;
                        data.tableData = pagination(
                            data.page.currentPage,
                            data.page.pageSize,
                            res.data
                        );
                        data.categoryOptions = parseTreeData(
                            res.data,
                            "dc_id",
                            "dc_name",
                            "value"
                        );
                        data.categoryOptions.push({
                            value: "0",
                            label: "无上级",
                        });
                    }
                });
            },
            //增加分类
            addClick() {
                data.model = {};
                data.showModal = true;
                data.formAction = "Document/createCategory";
            },
            //行编辑
            rowEditEvent(row) {
                apiRequest("Document/getCategory", { dc_id: row.dc_id }).then(
                    (res) => {
                        if (res) {
                            data.model = res.data;
                            data.showModal = true;
                            data.formAction = "Document/updateCategory";
                        }
                    }
                );
            },
            //行删除
            rowDeleteEvent(row) {
                VXETable.modal
                    .confirm("确定删除 " + row.dc_name + " 分类")
                    .then((res) => {
                        if (res == "confirm") {
                            apiRequest("Document/removeCategory", {
                                dc_id: row.dc_id,
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
            //表单提交
            submit() {
                refs.formRef.validate((err) => {
                    if (!err) {
                        apiRequest(data.formAction, data.model).then((res) => {
                            if (res) {
                                methods.loadTableData();
                                data.showModal = false;
                            }
                        });
                    }
                });
            },
        };
        /**********生命周期********* */
        methods.loadTableData();
        /*********返回*********** */
        return {
            ...toRefs(refs),
            ...values,
            ...toRefs(data),
            ...methods,
        };
    },
});
</script>

<style lang="less" scoped></style>
