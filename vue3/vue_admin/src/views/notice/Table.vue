<!--
 * @Author: Brightness
 * @Date: 2021-08-09 11:10:07
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-27 16:09:38
 * @Description:  
-->
<template>
    <div class="list">
        <page-title title="公告列表" />
        <n-layout has-sider>
            <!-- 侧边菜单 开始 -->
            <n-layout-sider width="180">
                <n-menu
                    @update:value="menuUpdate"
                    :options="menuOptions"
                    v-model:value="menuValue"
                />
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
                <div class="button-group">
                    <!-- <n-button class="btn" type="info">类别管理</n-button> -->
                    <n-button class="btn" type="info" @click="addNoticeClick"
                        >新建公告</n-button
                    >
                    <n-dropdown
                        class="btn"
                        @select="moveCategory"
                        trigger="click"
                        :options="categoryOptions"
                    >
                        <n-button>移动类别</n-button>
                    </n-dropdown>
                </div>
                <vxe-table
                    border="inner"
                    ref="tableRef"
                    auto-resize
                    highlight-current-row
                    highlight-hover-row
                    height="70%"
                    :data="tableData"
                >
                    <vxe-column type="checkbox" width="60"></vxe-column>
                    <vxe-column
                        field="n_title"
                        width="160"
                        title="公告标题"
                    ></vxe-column>
                    <vxe-column
                        field="category.nc_name"
                        title="公告类别"
                    ></vxe-column>
                    <vxe-column field="status" title="公告状态">
                        <template #default="{ row }">
                            {{ row.status ? "生效中" : "已过期" }}
                        </template>
                    </vxe-column>
                    <vxe-column field="n_start" title="生效日期"></vxe-column>
                    <vxe-column field="n_end" title="终止日期"></vxe-column>
                    <vxe-column
                        field="createUser.name"
                        title="发布人"
                    ></vxe-column>
                    <vxe-column
                        field="action"
                        title="操作"
                        width="180"
                        fixed="right"
                    >
                        <template #default="{ row }">
                            <div class="flex">
                                <n-button
                                    type="info"
                                    size="small"
                                    @click="rowReadEvent(row)"
                                >
                                    查看
                                </n-button>
                                <n-button
                                    type="info"
                                    size="small"
                                    @click="rowEditEvent(row)"
                                >
                                    编辑
                                </n-button>
                                <n-button
                                    type="info"
                                    size="small"
                                    @click="rowDeleteEvent(row)"
                                >
                                    删除
                                </n-button>
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

                <!-- 公告模态框 结束 -->
            </div>
        </n-layout>
        <!-- 公告模态框 开始 -->
        <n-modal v-model:show="showModal" :mask-closable="false">
            <n-card style="width: 600px;" title="新建公告" :bordered="false">
                <n-form
                    :model="formValue"
                    :rules="rules"
                    ref="formRef"
                    :label-width="100"
                    label-placement="left"
                >
                    <n-form-item label="发布人:">
                        <n-input
                            v-model:value="formValue.userName"
                            readonly
                        ></n-input>
                    </n-form-item>
                    <n-form-item label="公告类别:" path="nc_id">
                        <n-select
                            v-model:value="formValue.nc_id"
                            :options="categoryOptions"
                        ></n-select>
                    </n-form-item>
                    <n-form-item label="标题:" path="n_title">
                        <n-input v-model:value="formValue.n_title"></n-input>
                    </n-form-item>
                    <n-form-item label="开始日期:" path="n_start">
                        <n-date-picker
                            type="date"
                            v-model:value="formValue.n_start"
                        />
                    </n-form-item>
                    <n-form-item label="结束日期:" path="n_end">
                        <n-date-picker
                            type="date"
                            v-model:value="formValue.n_end"
                        />
                    </n-form-item>
                    <n-form-item label="公告内容:" path="n_content">
                        <n-input
                            type="textarea"
                            v-model:value="formValue.n_content"
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
        <!-- 主内容 结束 -->
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import pageTitle from "@/components/PageTitle.vue";
import {
    renderIcon,
    parseTreeData,
    pagination,
    zMessage,
    zDate,
} from "@/utils/tools";
import { IosCalendar } from "@vicons/ionicons4";
import { apiRequest } from "@/utils/api";
import { getStorage } from "@/utils/localStorage";
import { VXETable } from "vxe-table";
import router from "@/router";
export default defineComponent({
    components: {
        pageTitle,
        IosCalendar,
    },
    setup() {
        /********************** */
        let refs = reactive({
            tableRef: null,
            formRef: null,
        });
        /********非响应式数据************* */
        let values = {
            //校验
            rules: {
                nc_id: {
                    required: true,
                    message: "需要公告类别",
                    trigger: ["blur"],
                },
                n_title: {
                    required: true,
                    message: "需要标题",
                    trigger: ["blur"],
                },
                n_start: {
                    type: "number",
                    required: true,
                    message: "需要开始日期",
                    trigger: ["blur", "change"],
                },
                n_end: {
                    type: "number",
                    required: true,
                    message: "需要结束日期",
                    trigger: ["blur"],
                },
                n_content: {
                    required: true,
                    message: "需要公告内容",
                    trigger: ["blur"],
                },
            },
        };

        /*********响应式数据************** */
        let data = reactive({
            //侧边菜单
            menuOptions: [],
            //菜单选中值
            menuValue: null,
            //公告分类下拉选项
            categoryOptions: [],
            //搜索条件
            searchValue: {},

            //全部数据
            resultData: [],
            //表格数据
            tableData: [],
            //分页
            page: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0,
            },
            //是否显示模态框
            showModal: false,
            //表单数据
            formValue: {},
            //表单提交路径
            formAction: "",
            //当前分类
            categoryId: null,
        });

        /*********************************** */
        let methods = {
            //加载分类数据
            loadMenuOptions() {
                apiRequest("Notice/getCategoryList", data.searchValue).then(
                    (res) => {
                        if (res) {
                            data.menuOptions = parseTreeData(
                                res.data,
                                "nc_id",
                                "nc_name",
                                "key",
                                "label",
                                "children",
                                IosCalendar
                            );
                            data.menuValue = res.data[0].nc_id;
                            data.categoryOptions = parseTreeData(
                                res.data,
                                "nc_id",
                                "nc_name",
                                "value"
                            );

                            data.categoryId = res.data[0].nc_id;
                            methods.loadTableData({
                                sp: JSON.stringify({
                                    nc_id: data.categoryId,
                                }),
                            });
                        }
                    }
                );
            },
            //加载表格数据
            loadTableData(param = {}) {
                apiRequest("Notice/getList", param).then((res) => {
                    if (res) {
                        data.page.currentPage = 1;
                        data.page.totalResult = res.data.length;
                        data.resultData = res.data;
                        data.tableData = pagination(
                            data.page.currentPage,
                            data.page.pageSize,
                            res.data
                        );
                    }
                });
            },
            //新建点击
            addNoticeClick() {
                data.formValue = {};
                let user = getStorage("user");
                data.formValue.n_create_user = user.userId;
                data.formValue.userName = user.userName;
                data.formValue.nc_id = data.categoryId;
                data.showModal = true;
                data.formAction = "Notice/create";
            },
            //分类点击
            menuUpdate(key) {
                data.categoryId = key;
                methods.loadTableData({ sp: JSON.stringify({ nc_id: key }) });
            },
            //搜索点击
            searchClick() {
                window.$message.success("search");
            },
            //分页点击
            pageChange({ currentPage, pageSize }) {
                data.tableData = pagination(
                    currentPage,
                    pageSize,
                    data.resultData
                );
            },
            //查看点击
            rowReadEvent(row) {
                router.push("/notice/Detail/" + row.n_id);
            },
            //编辑点击
            rowEditEvent(row) {
                apiRequest("Notice/get", { n_id: row.n_id }).then((res) => {
                    if (res) {
                        let obj = res.data;
                        obj.n_start = new Date(obj.n_start).getTime();
                        obj.n_end = new Date(obj.n_end).getTime();
                        obj.userName = obj.createUser.name;
                        data.formValue = obj;
                        data.showModal = true;
                        data.formAction = "Notice/update";
                    }
                });
            },
            //移动类别
            moveCategory(key) {
                let keys = methods.getTableSelect();
                if (keys.length <= 0) {
                    zMessage("请勾选数据", "warning");
                    return;
                }
                VXETable.modal
                    .confirm("确定移动" + keys.length + "个公告吗？")
                    .then((action) => {
                        if (action == "confirm") {
                            apiRequest("Notice/changeCategory", {
                                keys,
                                nc_id: key,
                            }).then((res) => {
                                if (res) {
                                    methods.loadTableData({
                                        sp: JSON.stringify({
                                            nc_id: data.categoryId,
                                        }),
                                    });
                                }
                            });
                        }
                    });
            },
            //删除点击
            rowDeleteEvent(row) {
                VXETable.modal
                    .confirm("确定删除 《" + row.n_title + " 》 公告吗?")
                    .then((action) => {
                        if (action == "confirm") {
                            apiRequest("Notice/delete", {
                                n_id: row.n_id,
                            }).then((res) => {
                                if (res) {
                                    methods.loadTableData({
                                        sp: JSON.stringify({
                                            nc_id: data.categoryId,
                                        }),
                                    });
                                }
                            });
                        }
                    });
            },
            //表单提交
            submit() {
                refs.formRef.validate((err) => {
                    if (!err) {
                        let obj = Object.assign({}, data.formValue);
                        obj.n_start = zDate("Y-m-d", obj.n_start);
                        obj.n_end = zDate("Y-m-d", obj.n_end);
                        apiRequest(data.formAction, obj).then((res) => {
                            if (res) {
                                methods.loadTableData({
                                    sp: JSON.stringify({
                                        nc_id: data.categoryId,
                                    }),
                                });
                                data.showModal = false;
                            }
                        });
                    }
                });
            },
            //获取表格选中数据
            getTableSelect() {
                let rows = refs.tableRef.getCheckboxRecords();
                let keys = [];
                if (rows.length > 0) {
                    for (const i in rows) {
                        if (Object.hasOwnProperty.call(rows, i)) {
                            let row = rows[i];
                            keys.push(row.n_id);
                        }
                    }
                }
                return keys;
            },
        };
        /************************* */
        methods.loadMenuOptions();

        /************************* */
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

        .button-group {
            display: flex;
            .btn {
                margin-right: 10px;
            }
        }
    }
}
</style>
