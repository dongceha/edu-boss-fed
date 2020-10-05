<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({name: 'menu-create'})">添加菜单</el-button>
      </div>
      <el-table
        :data="menus"
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenus, deleteMenu } from '@/services/menu'

export default Vue.extend({
  data () {
    return {
      menus: []
    }
  },
  async created () {
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus () {
      const { data } = await getAllMenus()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    handleEdit (item: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: item.id
        }
      })
    },
    handleDelete (item: any) {
      this.$confirm('确认删除吗？', ' 删除提示', {})
        .then(async () => {
          const { data } = await deleteMenu(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadAllMenus()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
      console.log('delete', item)
    }
  }
})
</script>

<style>

</style>
