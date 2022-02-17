<!--
 * @Author: Brightness
 * @Date: 2021-08-10 16:29:44
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-25 16:42:43
 * @Description:  
-->
<template>
    <div class="job-list">
        <page-title title="岗位管理" />
        <div class="flex">
            <div class="left">
                <z-tree
                    :data="treeData"
                    keyField="post_id"
                    labelField="post_name"
                    @selecte="treeSelecte"
                />
            </div>
            <div class="right">
                <div class="button-group">
                    <n-button class="btn" type="info" @click="add"
                        >新增岗位</n-button
                    >
                </div>
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
                    <vxe-column field="post_name" title="岗位名称"></vxe-column>
                    <vxe-column
                        field="post.post_name"
                        title="直系上级"
                    ></vxe-column>
                    <vxe-column field="count" title="岗位成员"></vxe-column>
                    <vxe-column field="memo" title="职责描述"></vxe-column>
                    <vxe-column
                        field="action"
                        title="操作"
                        width="140"
                        fixed="right"
                    >
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
            </div>
        </div>
        <!-- 模态框 -->
        <n-modal v-model:show="showModal" :mask-closable="false">
            <n-card style="width: 600px;" title="新增岗位" :bordered="false">
                <n-form
                    ref="formRef"
                    :model="formValue"
                    :rules="rules"
                    :label-width="80"
                    label-placement="left"
                >
                    <n-form-item label="岗位编号">
                        <n-input
                            v-model:value="formValue.post_id"
                            readonly
                            placeholder="自动生成"
                        ></n-input>
                    </n-form-item>
                    <n-form-item label="岗位名称" path="post_name">
                        <n-input v-model:value="formValue.post_name"></n-input>
                    </n-form-item>
                    <n-form-item label="上级岗位">
                        <n-select
                            v-model:value="formValue.post_pid"
                            :options="parentSelectOptions"
                        />
                    </n-form-item>
                    <n-form-item label="岗位成员" path="people">
                        <n-select
                            v-model:value="formValue.people"
                            multiple
                            :options="peopleSelectOptions"
                        />
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
import ZTree from "@/components/ZTree.vue";
import { parseTreeData, pagination } from "@/utils/tools";
import { VXETable } from "vxe-table";

export default defineComponent({
    components: {
        PageTitle,
        ZTree,
    },
    setup() {
        /***************************** */
        let refs = reactive({
            tableRef: null,
            formRef: null,
        });
        /*********非响应式数据********** */
        let values = reactive({
            //表单校验规则
            rules: {
                post_name: {
                    required: true,
                    message: "需要岗位名称",
                    trigger: ["blur"],
                },
                people: {
                    type: "array",
                    required: true,
                    message: "需要岗位成员",
                    trigger: ["blur"],
                },
            },
        });
        /*********响应式数据************* */
        let data = reactive({
            //侧边树数据
            treeData: [],
            //岗位数据
            postData: [],
            //表格数据
            tableData: [],
            //分页数据
            page: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0,
            },
            //是否显示模态框
            showModal: false,
            //表单值
            formValue: { post_name: null, post_pid: null, people: null },
            //表单提交路径
            formAction: "",
            //上级岗位下拉框数据
            parentSelectOptions: [],
            //岗位成员下拉框数据
            peopleSelectOptions: [
                {
                    label: "Brightness",
                    value: "PM0001",
                },
                {
                    label: "Admin",
                    value: "admin",
                },
            ],
            //当前父级岗位
            pid: null,
        });

        /***************************** */
        let methods = {
            //加载树数据
            loadTreeData() {
                apiRequest("post/getTree").then((res) => {
                    if (res) {
                        data.treeData = res.data;
                        methods.loadTabelData();
                    }
                });
            },
            //加载表格数据
            loadTabelData(search = true) {
                let param = {};
                if (search === true) {
                    param = {
                        sp: JSON.stringify({ post_pid: data.pid }),
                    };
                } else {
                    param = search;
                }
                apiRequest("post/getList", param).then((res) => {
                    if (res) {
                        data.postData = res.data;
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
            //加载下拉框数据
            loadParentOptions() {
                apiRequest("post/getList").then((res) => {
                    if (res) {
                        data.parentSelectOptions = parseTreeData(
                            res.data,
                            "post_id",
                            "post_name",
                            "value"
                        );
                    }
                });
            },
            //树节点点击
            treeSelecte(keys) {
                let key = keys[0];
                if (key) {
                    data.pid = key;
                    methods.loadTabelData();
                }
            },
            //增加岗位
            add() {
                methods.loadParentOptions();
                data.formAction = "post/create";
                data.showModal = true;
                data.formValue = {
                    post_name: null,
                    post_pid: data.pid,
                    people: null,
                };
            },
            //编辑岗位
            rowEditEvent(row) {
                methods.loadParentOptions();
                data.formAction = "post/update";
                apiRequest("post/get", { post_id: row.post_id }).then((res) => {
                    if (res) {
                        data.showModal = true;

                        data.formValue = res.data;
                    }
                });
            },
            //移除岗位
            rowDeleteEvent(row) {
                VXETable.modal
                    .confirm("确定删除  " + row.post_name + "  岗位吗?")
                    .then((res) => {
                        if (res === "confirm") {
                            apiRequest("post/remove", {
                                keys: [row.post_id],
                            }).then((res) => {
                                if (res) {
                                    methods.loadTabelData();
                                    methods.loadTreeData();
                                }
                            });
                        }
                    });
            },
            pageChange({ currentPage, pageSize }) {
                data.page.currentPage = currentPage;
                data.page.pageSize = pageSize;
                data.tableData = pagination(
                    currentPage,
                    pageSize,
                    data.postData
                );
            },
            submit() {
                refs.formRef.validate((err) => {
                    if (!err) {
                        apiRequest(data.formAction, data.formValue).then(
                            (res) => {
                                if (res) {
                                    data.showModal = false;
                                    methods.loadTabelData();
                                    methods.loadTreeData();
                                }
                            }
                        );
                    }
                });
            },
        };

        /*****生命周期*********** */
        methods.loadTreeData();
        /*********************** */
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
.job-list {
    background-color: var(--background-color);
    .left {
        width: 220px;
        margin-right: 10px;
        background-color: #fff;
    }
    .right {
        width: 100%;
        height: 80vh;
        padding: 10px;
        background-color: #fff;

        .button-group {
            display: flex;
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
