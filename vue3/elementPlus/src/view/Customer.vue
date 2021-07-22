<!--
 * @Author: Brightness
 * @Date: 2021-07-21 09:22:03
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-22 09:44:11
 * @Description:  
-->
<template>
  <div class="customer">
    <!-- 基础列表 -->
    <base-list
      @add="addBtn"
      @edit="editBtn"
      @remove="removeBtn"
      tableUrl="cust/getCustList"
      ref="listRef"
    >
      <template #searchForm="{ form }">
        <el-form-item label="ID">
          <el-input v-model="form.cust_id" placeholder="ID"></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="form.cust_name" placeholder="客户名称"></el-input>
        </el-form-item>
      </template>

      <template #tableColumn>
        <el-table-column prop="cust_id" label="客户ID" width="180">
        </el-table-column>
        <el-table-column prop="cust_name" label="客户姓名" width="180">
        </el-table-column>
        <el-table-column prop="cust_cnt" label="联系人"> </el-table-column>
        <el-table-column prop="cust_tel" label="联系电话"> </el-table-column>
      </template>
    </base-list>

    <!-- 表单 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="dialogForm" :rules="dialogFormRules" ref="dialogFormRef">
        <el-form-item label="客户ID">
          <el-input
            v-model="dialogForm.cust_id"
            autocomplete="off"
            placeholder="自动生成"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="cust_name">
          <el-input
            v-model="dialogForm.cust_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="dialogForm.cust_cnt" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="dialogForm.cust_tel" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import BaseList from "@/components/BaseList.vue";
import apiRequest from "@/utils/api.js";
import { ElMessage, ElMessageBox } from "element-plus";
export default defineComponent({
  components: {
    BaseList,
  },
  setup() {
    /***************************** */
    let listRef = ref(null);
    let dialogFormRef = ref(null);
    let dialogVisible = ref(false);
    let dialogForm = ref({});
    let dialogTitle = ref("");
    let submitUrl = ref("");
    let dialogFormRules = ref({
      cust_name: [
        { required: true, message: "请输入客户名称", trigger: "blur" },
      ],
    });
    /****************************** */
    const methods = {
      addBtn() {
        dialogForm.value = {};
        dialogTitle.value = "新增客户信息";
        dialogVisible.value = true;
        submitUrl.value = "cust/createCust";
      },
      editBtn(row) {
        dialogForm.value = {};
        apiRequest("cust/getCust", { cust_id: row.cust_id }).then((res) => {
          if (res) {
            dialogTitle.value = "编辑客户信息";
            dialogVisible.value = true;
            submitUrl.value = "cust/updateCust";
            dialogForm.value = res.data;
          }
        });
      },
      removeBtn(rows) {
        ElMessageBox.confirm(
          "此操作将永久删除这" + rows.length + "行数据,是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            let keys = [];
            for (const i in rows) {
              keys.push(rows[i].cust_id);
            }

            apiRequest("cust/removeCusts", { keys: keys }).then((res) => {
              if (res) {
                listRef.value.loadData();
              }
            });
          })
          .catch(() => {
            ElMessage.info("已取消删除");
          });
      },
      submit() {
        dialogFormRef.value.validate((valid) => {
          if (valid) {
            apiRequest(submitUrl.value, dialogForm.value).then((res) => {
              if (res.errCode == 0) {
                dialogVisible.value = false;
                listRef.value.loadData();
              }
            });
          } else {
            ElMessage.error("表单数据不规范");
            return false;
          }
        });
      },
    };

    /***************************** */
    return {
      ...methods,
      listRef,
      dialogVisible,
      dialogForm,
      dialogTitle,
      submitUrl,
      dialogFormRules,
      dialogFormRef,
    };
  },
});
</script>
<style  scoped>
</style>