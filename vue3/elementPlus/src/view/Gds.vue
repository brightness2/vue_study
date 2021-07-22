<!--
 * @Author: Brightness
 * @Date: 2021-07-21 09:22:03
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-22 10:30:49
 * @Description:  
-->
<template>
  <div class="gds">
    <!-- 基础列表 -->
    <base-list
      @add="addBtn"
      @edit="editBtn"
      @remove="removeBtn"
      tableUrl="goods/getGdsList"
      ref="listRef"
    >
      <template #searchForm="{ form }">
        <el-form-item label="ID">
          <el-input v-model="form.gds_id" placeholder="ID"></el-input>
        </el-form-item>
        <el-form-item label="货品名称">
          <el-input v-model="form.gds_name" placeholder="货品名称"></el-input>
        </el-form-item>
      </template>

      <template #tableColumn>
        <el-table-column prop="gds_id" label="货品ID" width="180">
        </el-table-column>
        <el-table-column prop="gds_name" label="货品姓名" width="180">
        </el-table-column>
      </template>
    </base-list>

    <!-- 表单 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="dialogForm" :rules="dialogFormRules" ref="dialogFormRef">
        <el-form-item label="货品ID">
          <el-input
            v-model="dialogForm.gds_id"
            autocomplete="off"
            placeholder="自动生成"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="货品名称" prop="gds_name">
          <el-input v-model="dialogForm.gds_name" autocomplete="off"></el-input>
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
      gds_name: [
        { required: true, message: "请输入货品名称", trigger: "blur" },
      ],
    });
    /****************************** */
    const methods = {
      addBtn() {
        dialogForm.value = {};
        dialogTitle.value = "新增货品信息";
        dialogVisible.value = true;
        submitUrl.value = "goods/createGds";
      },
      editBtn(row) {
        dialogForm.value = {};
        apiRequest("goods/getGds", { gds_id: row.gds_id }).then((res) => {
          if (res) {
            dialogTitle.value = "编辑货品信息";
            dialogVisible.value = true;
            submitUrl.value = "goods/updateGds";
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
              keys.push(rows[i].gds_id);
            }

            apiRequest("goods/removeGdses", { keys: keys }).then((res) => {
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