<template>
  <div class="login">
    <el-form
      label-position="top"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="login-form">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          :loading="isLoginLoading"
          type="primary"
          @click="submitForm('ruleForm')">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'
import qs from 'qs'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  data () {
    return {
      isLoginLoading: false,
      ruleForm: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async submitForm () {
      try {
        await (this.$refs.ruleForm as Form).validate()
        this.isLoginLoading = true
        const { data } = await login(this.ruleForm)

        if (data.state !== 1) {
          return this.$message.error(data.message)
        }
        this.$store.commit('setUser', data.content)
        this.$router.push((this.$route.query.redirect as string) || '/')
        this.$message.success(data.message)
      } catch (error) {
        console.log('登陆失败', error)
      } finally {
        this.isLoginLoading = false
      }
    }
  }
})
</script>

<style lang="less">
.login{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 300px;
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 5px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
