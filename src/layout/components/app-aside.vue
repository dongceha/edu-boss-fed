<template>
  <div class="aside">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      router
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/role">角色管理</el-menu-item>
        <el-menu-item index="/menu">菜单管理</el-menu-item>
        <el-menu-item index="/resource">资源管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/course">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>课程管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/user">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item index="/advert">广告列表</el-menu-item>
        <el-menu-item index="/advert-space">广告位列</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AppSide',
  methods: {
    handleOpen (key: string, keyPath: string) {
      console.log(key, keyPath)
    },
    handleClose (key: string, keyPath: string) {
      console.log(key, keyPath)
    }
  }
})
</script>

<style lang="less" scoped>
.aside {
  .el-menu{
    min-height: 100vh;
  }
}
</style>>
