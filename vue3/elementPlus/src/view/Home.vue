<!--
 * @Author: Brightness
 * @Date: 2021-07-13 15:03:36
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-22 10:34:41
 * @Description:  主页
-->
<template>
  <el-container>
    <el-header>
      <el-row justify="space-between">
        <el-col :span="8">
          <div class="title">基本资料库</div>
        </el-col>
        <el-col :span="4">
          <!-- <el-button-group>
            <el-button type="primary" icon="el-icon-lock">修改密码</el-button>
            <el-button type="primary"
              >注销 <i class="el-icon-switch-button"></i
            ></el-button>
          </el-button-group> -->
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="base"
          class="el-menu-vertical-demo"
          @select="menuSelect"
        >
          <el-submenu index="base">
            <template #title>
              <i class="el-icon-location"></i>
              <span>基本资料</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="customer">客户资料</el-menu-item>
              <el-menu-item index="whs">仓库资料</el-menu-item>
              <el-menu-item index="stf">员工资料</el-menu-item>
              <el-menu-item index="gds">货品资料</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent } from "vue";
import router from "@/route";
export default defineComponent({
  setup() {
    /*************************** */
    const methods = {
      menuSelect(index, indexPath) {
        router.push(index);
      },
    };

    /***************************** */
    return {
      ...methods,
    };
  },
});
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: bold;
}
</style>