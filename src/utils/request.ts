// import { request } from '@/utils/request';
import store from '@/store'
import axios, { AxiosError } from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = axios.create({})

function redirectlogin (error: AxiosError) {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
  store.commit('setUser', null)
  return Promise.reject(error)
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    // refresh_token 只能使用一次，否则同样也会过期
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}
let isRefreshing = false
let requestlist: (() => any)[] = []
// 请求拦截
request.interceptors.request.use(config => {
  config.headers.Authorization = store.state.user ? store.state.user.access_token : ''

  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截
request.interceptors.response.use(response => {
  return response
}, async error => { // 超出 2xx 状态码都执行这里
  if (error.response) { // 请求发出去，收到响应了
    const { status } = error.response
    switch (status) {
      case 400:
        Message.error('请求参数错误')
        break
      case 401:
        if (!store.state.user) {
          return redirectlogin(error)
        }
        if (!isRefreshing) {
          isRefreshing = true
          return refreshToken()
            .then(({ data }) => {
              if (!data.success) {
                throw new Error('刷新 Token 失败')
              }
              store.commit('setUser', data.content)
              // 刷新 Token 成功了
              requestlist.forEach(cb => cb())
              requestlist = []
              return request(error.config)
            }).catch(err => {
              store.commit('setUser', null)
              return redirectlogin(err)
            }).finally(() => {
              isRefreshing = false
            })
        }
        // 刷新状态下，把请求挂起
        return new Promise(resolve => {
          requestlist.push(() => {
            resolve(request(error.config))
          })
        })
        break
      case 403:
        Message.error('没有权限，请联系管理员')
        break
      case 404:
        Message.error('请求资源不存在')
        break
      default:
        break
    }
  } else if (error.request) { // 请求发出去，没有收到响应
    Message.error('请求超时，请刷新重试')
  } else {
    Message.error(`请求失败，${error.message}`)
  }
  return Promise.reject(error)
})

export default request
