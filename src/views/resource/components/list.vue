<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select clearable v-model="form.categoryId" placeholder="请选择资源分类">
              <el-option label="全部" :value="null"></el-option>
              <el-option
                v-for="item in resourceCategories"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="isLoading" type="primary" @click="onSubmit">查询</el-button>
            <el-button :disabled="isLoading" @click="onreset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        v-loading="isLoading"
        :data="resources"
        style="width: 100%">
        <el-table-column
          type="index"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          width="180"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          width="180"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          width="180"
          label="添加时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :disabled="isLoading"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getResourcePages, getResourceCategories } from '@/services/resource'

export default Vue.extend({
  data () {
    return {
      form: {
        current: 1,
        size: 10,
        name: '',
        url: '',
        categoryId: null
      },
      isLoading: false,
      totalCount: 0,
      resources: [],
      resourceCategories: []
    }
  },
  created () {
    this.loadResource()
    this.loadResourceCategory()
  },
  methods: {
    async loadResourceCategory () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },
    async loadResource () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      this.totalCount = data.data.total
      this.resources = data.data.records
      this.isLoading = false
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.loadResource()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadResource()
    },
    onSubmit () {
      this.form.current = 1
      this.loadResource()
    },
    onreset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResource()
    },
    handleEdit (item: any) {
      console.log(item)
    },
    handleDelete (item: any) {
      console.log(item)
    }
  }
})
</script>

<style>

</style>
