<!--
 * @Author: Brightness
 * @Date: 2021-08-11 10:53:27
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-25 16:42:27
 * @Description:  
-->
<template>
    <div class="level">
        <page-title title="职级管理" />
        <div class="button-group">
            <n-button class="btn" type="info" @click="add">新建职级</n-button>
        </div>
        <!-- 表格 -->
        <vxe-table
            border="inner"
            ref="tableRef"
            auto-resize
            highlight-current-row
            highlight-hover-row
            height="72%"
            :data="tableData"
        >
            <vxe-column field="level_name" title="职级名称"></vxe-column>
            <vxe-column field="memo" title="职级介绍"></vxe-column>
            <vxe-column field="action" title="操作" width="160" fixed="right">
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
            <n-card style="width: 600px;" title="新增职级" :bordered="false">
                <n-form
                    ref="formRef"
                    :model="formValue"
                    :rules="rules"
                    :label-width="80"
                    label-placement="left"
                >
                    <n-form-item label="职级编号：">
                        <n-input
                            v-model:value="formValue.level_id"
                            readonly
                            placeholder="自动生成"
                        ></n-input>
                    </n-form-item>
                    <n-form-item label="职级名称：" path="level_name">
                        <n-input v-model:value="formValue.level_name"></n-input>
                    </n-form-item>

                    <n-form-item label="职级介绍：">
                        <n-input
                            type="textarea"
                            v-model:value="formValue.memo"
                        ></n-input>
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
import { defineComponent, reactive, ref, toRefs } from "vue";
import PageTitle from "@/components/PageTitle.vue";
import { apiRequest } from "@/utils/api";
import { pagination } from "@/utils/tools";
import { VXETable } from "vxe-table";
export default defineComponent({
    components: {
        PageTitle,
    },
    setup() {
        /********************** */
        let refs = reactive({
            tableRef: null,
            formRef: null,
        });
        /********************* */
        let values = {
            //校验规则
            rules: {
                level_name: {
                    required: true,
                    message: "需要职级名称",
                    trigger: ["blur"],
                },
            },
        };
        /********************* */
        let data = reactive({
            //职级数据
            levelData: [],
            //表格数据
            tableData: [],
            //分页数据
            page: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0,
            },
            //是否显示
            showModal: false,
            //表单数据
            formValue: {},
            //表单提交路径
            formAction: "",
        });
        /******************** */
        let methods = {
            //加载表格数据
            loadTableData() {
                apiRequest("level/getList").then((res) => {
                    if (res) {
                        data.levelData = res.data;
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
            //增加
            add() {
                data.formValue = {};
                data.showModal = true;
                data.formAction = "level/create";
            },

            //分页点击
            pageChange({ currentPage, pageSize }) {
                data.page.currentPage = currentPage;
                data.page.pageSize = pageSize;
                data.tableData = pagination(
                    currentPage,
                    pageSize,
                    data.levelData
                );
            },
            //编辑
            rowEditEvent(row) {
                data.formAction = "level/update";
                apiRequest("level/get", { level_id: row.level_id }).then(
                    (res) => {
                        if (res) {
                            data.formValue = res.data;
                            data.showModal = true;
                        }
                    }
                );
            },
            //删除
            rowDeleteEvent(row) {
                VXETable.modal
                    .confirm("是否删除 " + row.level_name + " 职级")
                    .then((action) => {
                        if (action === "confirm") {
                            apiRequest("level/delete", {
                                keys: row.level_id,
                            }).then((res) => {
                                if (res) {
                                    methods.loadTableData();
                                }
                            });
                        }
                    });
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
        /*************************** */
        methods.loadTableData();
        /****************************** */
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
.level {
    .button-group {
        display: flex;
        margin: 20px;
        .btn {
            margin-right: 20px;
        }
    }
}
.modal-footer {
    display: flex;
    justify-content: flex-end;
    .btn {
        margin-right: 20px;
    }
}
</style>
