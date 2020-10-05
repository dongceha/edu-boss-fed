<template>
  <div class="header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item readcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          shape="square"
          :size="30"
          :src="userInfo.portrait || require('@/assets/default-avatar.png')" />
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{userInfo.userName}}</el-dropdown-item>
        <el-dropdown-item
          divided
          @click.native="handleLogout"
        >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '@/services/user'

export default Vue.extend({
  name: 'AppSide',
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async getUserInfo () {
      const { data } = await getUserInfo()
      console.log(data)
      this.userInfo = data.content
    },
    handleLogout () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('setUser', null)
        this.$router.push({
          name: 'login'
        })
        this.$message.success('退出成功')
      }).catch(() => {
        this.$message.success('取消退出成功')
      })
    },
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
.header{
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  .el-dropdown-link{
    display: flex;
    align-items: center;
  }
}
</style>
