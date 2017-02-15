import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'// 注册两个插件
import routes  from './router.js'

import main from './main.vue'

Vue.use(VueResource);
Vue.use(VueRouter);

// 1. 开启debug模式
Vue.config.debug = true

// 2. 打开vue-resource的from-data模式，否则post过去的数据会是json形式，php无法识别
Vue.http.options.emulateJSON = true;

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    mode: 'hash',   // 强制使用hash模式进行导航，不能指望服务器支持history
    routes:routes,  // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
    render: h => h(main),
    router:router,
}).$mount('#app')
