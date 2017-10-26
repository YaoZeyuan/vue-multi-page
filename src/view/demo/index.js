import Vue from 'vue'

import VueRouter from 'vue-router'
import routes from './router.js'
import http from 'src/lib/http'

import main from './main.vue'

Vue.use(VueRouter)

// 1. 开启debug模式
Vue.config.debug = true

// 将axios实例绑定到$http变量上，方便使用this & 兼容之前的代码
Vue.prototype.$http = http

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  mode: 'hash',   // 强制使用hash模式进行导航，不能指望服务器支持history
  routes: routes  // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  render: h => h(main),
  router: router
})
app.$mount('#app')
