'use strict'
/**
 * 统一获取http数据
 * Created by yaoze on 2017/2/17.
 */
import axios from 'axios' // 引入axios组件
import querystring from 'querystring' // 使用体积更小的querystring替代qs以进行表单提交
import vueJsonp from 'vue-jsonp' // 引入jsonp方法

// 创建axios实例
let http = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url，后台开发/本地调试时不需要指定
  // timeout: 5000                  // 请求超时时间，后台开发不需要指定，响应时间如果真的太长的话，锤子比配置好使

  // 将post转成form-urlencoded的形式, 否则post过去的数据会是json形式，php无法识别
  transformRequest: [function (data) {
    data = querystring.stringify(data)
    return data
  }],
  // 设置post类型
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})

// vue-jsonp的调用方式和axios一致
// 因为vue-json是一个vue插件，所以需要用hack的方式主动调用install方法进行安装
// 添加jsonp方法, 默认超时时间:60s
vueJsonp.install(http, 60000)

// respone拦截器
http.interceptors.response.use(
  // 响应成功
  response => {
    const data = response.data
    // 打印响应值
    // console.log('receive response => ')
    // console.log(response)
    if (response.status === 200) {
      return data
    } else {
      // 异常响应
      // console.log('服务器状态码不为200,返回response,留待程序自行处理')
      return response
    }
  },
  // 响应失败
  error => {
    // 一般情况下，只要服务器返回的状态码不是2XX或者304,都会报这个错误
    // console.log('服务器响应错误')
    // console.log('error.message => ')
    // console.log(error.message)
    if (error.request) {
      // console.log('请求信息:')
      // console.log(error.request)
    }
    let returnError = error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log('响应内容:')
      // console.log(error.response)
      returnError = error.response
    } else {
      // console.log('没有响应内容')
      returnError = Promise.reject(error)
    }
    return returnError
  }
)
export default http
