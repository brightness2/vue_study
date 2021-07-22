<!--
 * @Author: Brightness
 * @Date: 2021-07-21 10:21:59
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-21 16:55:43
 * @Description:  
-->
<template>
  <div class="base-list">
    <!-- 顶部按钮 开始 -->
    <el-row justify="start">
      <el-button-group class="mr flex">
        <el-button
          v-if="topBtns.add !== false"
          type="primary"
          icon="el-icon-plus"
          @click="addClick"
          >增加</el-button
        >
        <el-button
          v-if="topBtns.edit !== false"
          type="primary"
          icon="el-icon-edit"
          @click="editClick"
          >编辑</el-button
        >
        <el-button
          v-if="topBtns.remove !== false"
          type="primary"
          icon="el-icon-delete"
          @click="removeClick"
          >删除</el-button
        >
      </el-button-group>
      <el-button-group class="flex">
        <el-button
          v-if="topBtns.search !== false"
          type="primary"
          icon="el-icon-search"
          @click="searchClick"
          >搜索</el-button
        >
      </el-button-group>
    </el-row>
    <!-- 顶部按钮 结束 -->
    <!-- 搜索表单 开始 -->
    <el-form :inline="true" :model="formValue">
      <slot name="searchForm" :form="formValue"></slot>
    </el-form>
    <!-- 搜索表单 结束 -->
    <!-- 数据表格 开始 -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      ref="tableRef"
      @selection-change="tableSelect"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <slot name="tableColumn"></slot>
    </el-table>
    <!-- 数据表格 结束 -->
    <!-- 分页 开始 -->
    <el-pagination
      class="mt"
      @size-change="sizeChange"
      @current-change="currentChange"
      v-model:currentPage="currentPage"
      :page-sizes="pageSizes"
      :page-size="psize"
      layout=" prev, pager, next, sizes"
      :total="total"
    >
    </el-pagination>
    <!-- 分页 结束 -->
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import apiRequest from "@/utils/api.js";
import { ElMessage } from "element-plus";
export default defineComponent({
  /*******对外属性******** */
  props: {
    //顶部按钮
    topBtns: {
      type: Object,
      default: {
        add: true,
        edit: true,
        remove: true,
        search: true,
      },
    },
    //表格请求路径
    tableUrl: {
      type: String,
      required: true,
    },
    //可选显示条数列表
    pageSizes: {
      type: Array,
      default: [3, 5, 7],
    },
    //当前显示条数
    pageSize: {
      type: Number,
      default: 3,
    },
  },
  setup(props, context) {
    /****************************** */
    let formValue = ref({}); //表单数据
    let tableData = ref([]); //表格数据
    let tableRef = ref(null); //表格元素
    let tableSelection = ref([]); //选中的表格数据
    let currentPage = ref(1); //当前页码
    let total = ref(0); //表格数据总条数
    let psize = ref(props.pageSize); //当前显示条数
    /*************************** */
    const methods = {
      //增加按钮点击事件
      addClick() {
        context.emit("add");
      },
      //编辑按钮点击事件
      editClick() {
        if (tableSelection.value.length <= 0) {
          ElMessage.warning("请选择数据,只能选择一行");
          return;
        }
        if (tableSelection.value.length > 1) {
          ElMessage.warning("只能选择一行");
          return;
        }
        context.emit("edit", tableSelection.value[0]);
      },
      //移除按钮点击事件
      removeClick() {
        if (tableSelection.value.length <= 0) {
          ElMessage.warning("请选择数据");
          return;
        }
        context.emit("remove", tableSelection.value);
      },
      //搜索按钮点击事件
      searchClick() {
        methods.loadData();
      },
      //加载表格数据
      loadData() {
        let page = [psize.value, currentPage.value];
        apiRequest(props.tableUrl, { ...formValue.value, page }).then((res) => {
          if (res) {
            tableData.value = res.data.list;
            total.value = res.data.total;
          }
        });
      },
      //表格选择
      tableSelect(val) {
        tableSelection.value = val;
      },
      //显示条数改变
      sizeChange(pageSize) {
        psize.value = pageSize;
        methods.loadData();
      },
      //当前页码改变
      currentChange(currPage) {
        currentPage.value = currPage;
        methods.loadData();
      },
    };
    /**************生命周期****************** */
    onMounted(() => {
      methods.loadData();
    });

    /********************** */
    return {
      formValue,
      tableData,
      ...methods,
      tableRef,
      tableSelection,
      currentPage,
      psize,
      total,
    };
  },
});
</script>

<style  scoped>
.mr {
  margin-right: 20px;
}
.mt {
  margin-top: 20px;
}
</style>
