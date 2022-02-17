<!--
 * @Author: Brightness
 * @Date: 2021-08-06 14:45:37
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-26 10:04:15
 * @Description:  
-->
<template>
    <div class="table">
        <!-- 标题 开始 -->
        <page-title title="文档管理" />
        <!-- 标题 结束 -->
        <n-layout has-sider>
            <!-- 侧边菜单 开始 -->
            <n-layout-sider width="180">
                <n-menu @update:value="menuClick" :options="menuOptions" />
            </n-layout-sider>
            <!-- 侧边菜单 结束 -->
            <!-- 主内容 开始 -->
            <div class="content">
                <div class="flex">
                    <!-- 按钮组 -->
                    <div class="button-group">
                        <n-button type="info" @click="addCategoryClick">
                            <template #icon>
                                <n-icon><md-document /></n-icon>
                            </template>
                            新建分类
                        </n-button>
                        <upload
                            ref="uploadRef"
                            action="Document/uploadFile"
                            :param="{ dc_id: categoryId }"
                            @beforeUpload="beforeUpload"
                            @finish="uploadFinish"
                        >
                            <n-button type="info">
                                <template #icon>
                                    <n-icon><md-document /></n-icon>
                                </template>
                                上传文件
                            </n-button>
                        </upload>

                        <n-button type="info" @click="changeCategoryClick">
                            <template #icon>
                                <n-icon><md-document /></n-icon>
                            </template>
                            转存到
                        </n-button>
                        <n-button type="info" @click="downloadMoreClick">
                            <template #icon>
                                <n-icon><md-document /></n-icon>
                            </template>
                            下载
                        </n-button>
                        <n-button type="info" @click="deleteMoreClick">
                            <template #icon>
                                <n-icon><md-document /></n-icon>
                            </template>
                            删除
                        </n-button>
                    </div>
                    <!-- 搜索区 -->
                    <div class="search-group">
                        <n-input
                            v-model:value="searchValue.name"
                            placeholder="请输入名称"
                        />
                        <n-button
                            type="info"
                            class="search-btn"
                            @click="searchClick"
                            >搜索</n-button
                        >
                        <span class="search-more" @click="searchModal = true"
                            >展开</span
                        >
                        <n-modal
                            v-model:show="searchModal"
                            style=" position: fixed; right: 30px; top: 180px;"
                        >
                            <n-card
                                style="width: 600px;"
                                title="搜索区"
                                :bordered="false"
                            >
                                <n-form
                                    inline
                                    :label-width="80"
                                    :model="searchValue"
                                    label-placement="left"
                                >
                                    <n-form-item label="名称">
                                        <n-input
                                            v-model:value="searchValue.name"
                                        />
                                    </n-form-item>
                                    <n-form-item label="创建人">
                                        <n-input
                                            v-model:value="searchValue.user"
                                        />
                                    </n-form-item>
                                </n-form>
                                <template #footer>
                                    <div style="text-align: right;">
                                        <n-button
                                            type="info"
                                            @click="searchClick"
                                            >搜索</n-button
                                        >
                                        <span
                                            style="color:var(--blue-color);cursor: pointer;"
                                            @click="searchModal = false"
                                        >
                                            收起
                                        </span>
                                    </div>
                                </template>
                            </n-card>
                        </n-modal>
                    </div>
                </div>

                <!-- 表格 -->
                <vxe-table
                    border="inner"
                    ref="tableRef"
                    auto-resize
                    highlight-current-row
                    highlight-hover-row
                    height="70%"
                    empty-text="暂无数据,请从左侧选择分类"
                    :data="tableData"
                >
                    <vxe-column type="checkbox" width="60"></vxe-column>
                    <vxe-column field="d_name" title="名称"></vxe-column>
                    <vxe-column
                        field="category.dc_name"
                        title="分类"
                    ></vxe-column>
                    <!-- <vxe-column field="count" title="下载次数"></vxe-column> -->
                    <!-- <vxe-column field="user" title="最后更新"></vxe-column> -->
                    <vxe-column
                        field="action"
                        title="操作"
                        width="150"
                        fixed="right"
                    >
                        <template #default="{ row }">
                            <div class="flex">
                                <upload
                                    ref="reUploadRef"
                                    action="Document/reupload"
                                    :param="{
                                        d_id: row.d_id,
                                        dc_id: row.dc_id,
                                    }"
                                    @finish="uploadFinish"
                                >
                                    <n-button type="info" size="small">
                                        重新上传
                                    </n-button>
                                </upload>
                                <n-button
                                    type="info"
                                    size="small"
                                    @click="rowDownloadEvent(row)"
                                    >下载</n-button
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
            <!-- 主内容 结束 -->
        </n-layout>
        <!-- 分类模态框 开始 -->
        <n-modal v-model:show="showModal" :mask-closable="false">
            <n-card style="width: 600px;" title="新建分类" :bordered="false">
                <n-form
                    :model="categoryFormValue"
                    :rules="categoryRules"
                    ref="categoryFormRef"
                >
                    <n-form-item label="分类名称" path="dc_name">
                        <n-input
                            v-model:value="categoryFormValue.dc_name"
                        ></n-input>
                    </n-form-item>
                    <n-form-item label="上级分类">
                        <n-select
                            v-model:value="categoryFormValue.dc_pid"
                            :options="categoryOptions"
                        ></n-select>
                    </n-form-item>
                    <n-form-item label="备注">
                        <n-input
                            v-model:value="categoryFormValue.memo"
                        ></n-input>
                    </n-form-item>
                </n-form>
                <div class="modal-footer">
                    <n-button class="btn" @click="showModal = false"
                        >取消</n-button
                    >
                    <n-button class="btn" type="info" @click="categorySubmit"
                        >确定</n-button
                    >
                </div>
            </n-card>
        </n-modal>
        <!-- 分类模态框 结束 -->
        <!-- 转存模态框 开始 -->
        <n-modal v-model:show="showChangeModal" :mask-closable="false">
            <n-card style="width: 600px;" title="转存分类" :bordered="false">
                <n-form
                    :model="changeCategoryFormValue"
                    :rules="changeCategoryRules"
                    ref="changeCategoryFormRef"
                >
                    <n-form-item label="转存分类" path="dc_id">
                        <n-select
                            v-model:value="changeCategoryFormValue.dc_id"
                            :options="categoryOptions"
                        ></n-select>
                    </n-form-item>
                </n-form>
                <div class="modal-footer">
                    <n-button class="btn" @click="showChangeModal = false"
                        >取消</n-button
                    >
                    <n-button
                        class="btn"
                        type="info"
                        @click="changeCategorySubmit"
                        >确定</n-button
                    >
                </div>
            </n-card>
        </n-modal>
        <!-- 转存模态框 结束 -->
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import PageTitle from "@/components/PageTitle.vue";
import { renderIcon, zMessage, parseTreeData, pagination } from "@/utils/tools";
import { MdDocument } from "@vicons/ionicons4";
import { apiRequest, download } from "@/utils/api";
import Upload from "@/components/Upload.vue";
import { VXETable } from "vxe-table";
export default defineComponent({
    components: {
        PageTitle,
        MdDocument,
        Upload,
    },
    setup() {
        /*********************** */
        let refs = reactive({
            tableRef: null,
            categoryFormRef: null,
            uploadRef: null,
            reUploadRef: null,
            changeCategoryFormRef: null,
        });
        /***********非响应式数据*************** */
        let values = {
            //分类表单校验规则
            categoryRules: {
                dc_name: {
                    required: true,
                    message: "需要分类名称",
                    trigger: ["blur"],
                },
            },
            changeCategoryRules: {
                dc_id: {
                    required: true,
                    message: "需要选择分类",
                    trigger: ["blur"],
                },
            },
        };
        /***********响应式数据***************** */
        let data = reactive({
            //菜单数据
            menuOptions: [],
            //搜索条件数据
            searchValue: {},
            //是否显示搜索表单区
            searchModal: false,
            //文档数据
            resultData: [],
            //表格数据
            tableData: [],
            //分配数据
            page: { currentPage: 1, pageSize: 10, totalResult: 0 },
            //分类模态框是否显示
            showModal: false,
            //分类表单数据
            categoryFormValue: {},
            //分类下拉选择
            categoryOptions: [],
            //当前分类
            categoryId: 0,

            //显示转存模态框
            showChangeModal: false,
            //转存表单数据
            changeCategoryFormValue: {
                //转存分类
                dc_id: null,
            },
        });

        /******************* */
        const methods = {
            //加载菜单数据
            loadMenuData() {
                apiRequest("Document/getCategoryTree").then((res) => {
                    if (res) {
                        data.menuOptions = parseTreeData(
                            res.data,
                            "dc_id",
                            "dc_name"
                        );
                    }
                });
            },
            //加载分类选项
            loadCategoryOptions(param = {}) {
                apiRequest("Document/getCategoryList", {
                    sp: JSON.stringify(param),
                }).then((res) => {
                    if (res) {
                        data.categoryOptions = parseTreeData(
                            res.data,
                            "dc_id",
                            "dc_name",
                            "value"
                        );
                    }
                });
            },
            //加载表格数据
            loadTableData() {
                apiRequest("document/getDocumentListByCategory", {
                    dc_id: data.categoryId,
                }).then((res) => {
                    if (res) {
                        data.resultData = res.data;
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
            //新建分类
            addCategoryClick() {
                data.categoryFormValue = {};
                data.showModal = true;
                methods.loadCategoryOptions();
            },
            //新建分类表单提交
            categorySubmit() {
                refs.categoryFormRef.validate((err) => {
                    if (!err) {
                        apiRequest(
                            "Document/createCategory",
                            data.categoryFormValue
                        ).then((res) => {
                            if (res) {
                                methods.loadMenuData();
                                data.showModal = false;
                            }
                        });
                    }
                });
            },
            beforeUpload(options, callBack) {
                if (!data.categoryId) {
                    zMessage("请从左侧选择分类", "warning");
                    callBack(false);
                } else {
                    callBack(true);
                }
            },
            //上传完成
            uploadFinish(result) {
                if (result.errCode == 0) {
                    result.msg && zMessage(result.msg);
                    methods.loadTableData();
                }
            },
            //获取选择的数据，没有返回false,有则返回选中主键数组
            getTableSelect() {
                let rows = refs.tableRef.getCheckboxRecords();
                if (rows.length <= 0) return false;
                let keys = [];
                for (const key in rows) {
                    if (Object.hasOwnProperty.call(rows, key)) {
                        keys.push(rows[key].d_id);
                    }
                }
                return keys;
            },
            //转存
            changeCategoryClick() {
                if (!data.categoryId) {
                    zMessage("请从左侧选择分类", "warning");
                    return;
                }
                let rows = refs.tableRef.getCheckboxRecords();
                if (rows.length <= 0) {
                    zMessage("请勾选文件", "warning");
                    return;
                }
                methods.loadCategoryOptions({ child: 1 });
                data.showChangeModal = true;
            },
            //转存表单提交
            changeCategorySubmit(keys) {
                refs.changeCategoryFormRef.validate((err) => {
                    if (!err) {
                        let keys = methods.getTableSelect();
                        data.changeCategoryFormValue.keys = keys;
                        apiRequest(
                            "Document/changeCategory",
                            data.changeCategoryFormValue
                        ).then((res) => {
                            if (res) {
                                methods.loadTableData();
                                data.showChangeModal = false;
                            }
                        });
                    }
                });
            },
            //批量下载
            downloadMoreClick() {
                let rows = refs.tableRef.getCheckboxRecords();
                if (rows.length <= 0) {
                    zMessage("请勾选文件", "warning");
                    return;
                }
                VXETable.modal
                    .confirm("确定下载 " + rows.length + " 个文件吗？")
                    .then((action) => {
                        if (action == "confirm") {
                            let row = null;
                            for (const i in rows) {
                                if (Object.hasOwnProperty.call(rows, i)) {
                                    row = rows[i];
                                    download(row.d_url, row.d_ext);
                                }
                            }
                        }
                    });
            },
            //批量删除
            deleteMoreClick() {
                let keys = methods.getTableSelect();
                if (!keys) {
                    zMessage("请勾选文件", "warning");
                    return;
                }
                VXETable.modal
                    .confirm("确定删除 " + keys.length + " 个文件吗？")
                    .then((action) => {
                        if (action == "confirm") {
                            apiRequest("Document/removeFiles", { keys }).then(
                                (res) => {
                                    if (res) {
                                        methods.loadTableData();
                                    }
                                }
                            );
                        }
                    });
            },
            //搜索点击
            searchClick() {
                zMessage("搜索操作");
            },
            //菜单选择
            menuClick(key) {
                data.categoryId = key;

                methods.loadTableData();
            },

            //行下载
            rowDownloadEvent(row) {
                VXETable.modal.confirm("确定要下载吗?").then((action) => {
                    if (action == "confirm") {
                        // 下载到本地
                        download(row.d_url, row.d_ext);
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
                    data.resultData
                );
            },
        };
        /**************生命周期******************** */
        methods.loadMenuData();
        /************返回数据**************** */
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
.table {
    background-color: var(--background-color);
    .n-layout {
        background-color: var(--background-color);
    }
    .content {
        width: 100%;
        height: 80vh;
        margin-left: 20px;
        background-color: #fff;
    }

    .button-group {
        display: flex;
        button {
            margin: 10px;
        }
    }

    .search-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;

        .search-btn {
            margin-left: 10px;
        }
        .search-more {
            width: 80px;
            color: var(--blue-color);
            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>
