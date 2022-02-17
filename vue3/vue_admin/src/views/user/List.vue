<!--
 * @Author: Brightness
 * @Date: 2021-08-11 14:09:45
 * @LastEditors: Brightness
 * @LastEditTime: 2021-09-02 16:34:10
 * @Description:  
-->
<template>
    <div class="account">
        <page-title title="用户账号" />
        <div class="tools-box">
            <div>
                <vxe-button
                    status="primary"
                    content="新增"
                    @click="addUser"
                ></vxe-button>
                <vxe-button
                    status="primary"
                    content="停用"
                    @click="disableUser"
                ></vxe-button>
                <vxe-button
                    status="primary"
                    content="删除"
                    @click="removeUser"
                ></vxe-button>
                <vxe-button
                    status="primary"
                    content="重置密码"
                    @click="resetPassword"
                ></vxe-button>
            </div>
            <div>
                <vxe-select
                    v-model="searchValue.status"
                    placeholder="请选择账号状态"
                >
                    <vxe-option :value="1" label="正常"></vxe-option>
                    <vxe-option :value="0" label="停用"></vxe-option>
                </vxe-select>
                <vxe-select
                    v-model="searchValue.dept_id"
                    placeholder="请选择部门"
                >
                    <vxe-option :value="1" label="正常"></vxe-option>
                    <vxe-option :value="0" label="停用"></vxe-option>
                </vxe-select>
                <vxe-select
                    v-model="searchValue.post_id"
                    placeholder="请选择职位"
                >
                    <vxe-option :value="1" label="正常"></vxe-option>
                    <vxe-option :value="0" label="停用"></vxe-option>
                </vxe-select>
                <vxe-input
                    v-model="searchValue.name"
                    placeholder="姓名"
                ></vxe-input>
                <vxe-button
                    status="primary"
                    content="搜索"
                    @click="loadUserData"
                ></vxe-button>
            </div>
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
            <vxe-column type="checkbox" width="60"></vxe-column>
            <vxe-column field="user_id" title="编号"></vxe-column>
            <vxe-column field="name" title="登录账号"></vxe-column>
            <vxe-column field="sexText" title="性别"></vxe-column>
            <vxe-column field="dept_id" title="部门"></vxe-column>
            <vxe-column field="position.post_name" title="岗位"></vxe-column>
            <vxe-column field="phone" title="联系号码"></vxe-column>
            <vxe-column field="statusText" title="账号状态"></vxe-column>
            <vxe-column field="action" title="操作" width="100" fixed="right">
                <template #default="{ row }">
                    <div class="flex">
                        <n-button
                            type="info"
                            size="small"
                            @click="rowEditEvent(row)"
                            >编辑</n-button
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
        <!-- 模态框 开始 -->
        <n-modal v-model:show="showModal" :mask-closable="false">
            <n-card style="width: 600px;" title="账号信息" :bordered="false">
                <n-form
                    ref="formRef"
                    :model="formValue"
                    :rules="rules"
                    label-placement="left"
                    :label-width="140"
                >
                    <n-form-item label="登录账号(工号)：">
                        <n-input
                            v-model:value="formValue.user_id"
                            placeholder="自动生成 , 不可编辑"
                            readonly
                        ></n-input>
                    </n-form-item>
                    <n-form-item label="登录密码：" path="password">
                        <n-input
                            type="password"
                            v-model:value="formValue.password"
                            placeholder="不填写，不做修改"
                        ></n-input>
                    </n-form-item>
                    <n-form-item label="姓名：" path="name">
                        <n-input v-model:value="formValue.name"></n-input>
                    </n-form-item>
                    <n-form-item label="性别：">
                        <n-select
                            v-model:value="formValue.sex"
                            :options="[
                                { label: '男', value: 0 },
                                { label: '女', value: 1 },
                            ]"
                        />
                    </n-form-item>
                    <n-form-item label="部门：">
                        <n-select
                            v-model:value="formValue.dept_id"
                            :options="deptOptions"
                        />
                    </n-form-item>
                    <n-form-item label="岗位：" path="post_id">
                        <n-select
                            v-model:value="formValue.post_id"
                            :options="postOptions"
                        />
                    </n-form-item>
                    <n-form-item label="手机号：">
                        <n-input v-model:value="formValue.phone" />
                    </n-form-item>
                    <n-form-item label="权限组：" path="roles">
                        <n-select
                            multiple
                            v-model:value="formValue.roles"
                            :options="rolesOptions"
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
        <!-- 模态框 结束 -->
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import PageTitle from "@/components/PageTitle.vue";
import { apiRequest } from "@/utils/api";
import { VXETable } from "vxe-table";
import { pagination, parseTreeData } from "@/utils/tools";
export default defineComponent({
    components: {
        PageTitle,
    },
    setup() {
        /*************************** */
        let refs = reactive({
            tableRef: null,
            formRef: null,
        });
        /***********非响应式数据*************** */
        let values = {
            statusOptons: [
                {
                    label: "正常",
                    value: 1,
                },
                {
                    label: "停用",
                    value: 0,
                },
            ],
        };
        /**************响应式数据**************** */
        let data = reactive({
            //搜索添加数据
            searchValue: {
                status: null,
                dept_id: null,
                post_id: null,
                name: null,
            },
            //用户数据
            userData: [],
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
            //表单数据
            formValue: { sex: 0 },
            //表单校验规则
            rules: {
                name: {
                    required: true,
                    message: "需要姓名",
                    trigger: ["blur"],
                },
                post_id: {
                    required: true,
                    message: "选择岗位",
                    trigger: ["blur"],
                },
                password: {
                    required: false,
                    message: "需要密码",
                    trigger: ["blur"],
                },
                roles: {
                    type: "array",
                    required: false,
                    message: "选择权限组",
                    trigger: ["blur"],
                },
            },
            //部门选择项数据
            deptOptions: [],
            //岗位选择项数据
            postOptions: [],
            //组选择项数据
            rolesOptions: [],
            //表单提交url
            formAction: "",
        });

        /****************************** */
        let methods = {
            //加载用户数据
            loadUserData() {
                data.page.currentPage = 1;
                apiRequest("user/getList", {
                    sp: JSON.stringify(data.searchValue),
                }).then((res) => {
                    if (res) {
                        data.page.totalResult = res.data.length;
                        data.userData = res.data;
                        data.tableData = pagination(
                            data.page.currentPage,
                            data.page.pageSize,
                            res.data
                        );
                    }
                });
            },
            //加载岗位数据
            loadPostData() {
                apiRequest("post/getList").then((res) => {
                    if (res) {
                        data.postOptions = parseTreeData(
                            res.data,
                            "post_id",
                            "post_name",
                            "value"
                        );
                    }
                });
            },
            //分页点击
            pageChange({ currentPage, pageSize }) {
                data.page.currentPage = currentPage;
                data.page.pageSize = pageSize;
                data.tableData = pagination(
                    currentPage,
                    pageSize,
                    data.userData
                );
            },
            //新增用户
            addUser() {
                data.showModal = true;
                data.rules.password.required = true;
                data.formAction = "user/create";
                data.formValue = { sex: 0 };
                methods.loadPostData();
            },
            //行编辑
            rowEditEvent(row) {
                apiRequest("user/get", { user_id: row.user_id }).then((res) => {
                    if (res) {
                        methods.loadPostData();
                        data.rules.password.required = false;
                        data.formAction = "user/update";
                        data.showModal = true;
                        data.formValue = res.data;
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
                                    data.showModal = false;
                                    methods.loadUserData();
                                }
                            }
                        );
                    }
                });
            },
            //获取选择的数据，没有返回false,有则返回选中主键数组
            getTableSelect() {
                let rows = refs.tableRef.getCheckboxRecords();
                if (rows.length <= 0) return false;
                let keys = [];
                for (const key in rows) {
                    if (Object.hasOwnProperty.call(rows, key)) {
                        keys.push(rows[key].user_id);
                    }
                }
                return keys;
            },

            //禁用用户
            async disableUser() {
                let keys = methods.getTableSelect();
                if (!keys) {
                    window.$message.warning("请选择数据");
                    return;
                }
                let type = await VXETable.modal.confirm(
                    "确定要禁用 " + keys.length + " 个用户吗？"
                );
                if (type == "confirm") {
                    apiRequest("user/disable", { keys }).then((res) => {
                        if (res) {
                            methods.loadUserData();
                        }
                    });
                }
            },
            //删除用户
            async removeUser() {
                let keys = methods.getTableSelect();
                if (!keys) {
                    window.$message.warning("请选择数据");
                    return;
                }
                let type = await VXETable.modal.confirm(
                    "确定要删除 " + keys.length + " 个用户吗？"
                );
                if (type == "confirm") {
                    apiRequest("user/remove", { keys }).then((res) => {
                        if (res) {
                            methods.loadUserData();
                        }
                    });
                }
            },
            //重置密码
            async resetPassword() {
                let keys = methods.getTableSelect();
                if (!keys) {
                    window.$message.warning("请选择数据");
                    return;
                }
                let type = await VXETable.modal.confirm(
                    "确定要重置 " + keys.length + " 个用户的密码吗？"
                );
                if (type == "confirm") {
                    apiRequest("user/resetPassword", { keys });
                }
            },
        };
        /************生命周期**************** */
        methods.loadUserData();
        /******************************* */
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
.account {
    .tools-box {
        display: flex;
        justify-content: space-around;
        padding: 10px;
    }
}
</style>
