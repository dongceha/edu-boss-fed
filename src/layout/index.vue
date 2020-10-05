<template>
    <el-container>
        <el-aside width="200px">
          <AppSide></AppSide>
        </el-aside>
        <el-container>
            <el-header>
              <AppHeader></AppHeader>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppSide from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

export default Vue.extend({
  components: {
    AppSide,
    AppHeader
  }
})
</script>
<style scoped>
  .el-container {
    height: 100vh;
  }
  .el-header {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* line-height: 160px; */
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
