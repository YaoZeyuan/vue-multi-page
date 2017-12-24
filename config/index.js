"use strict";
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.
let path = require("path");
let projectConfig = require("./project.js"); // 在配置生成路径时需要projectConfig中的相关信息，故预先导入
let cdn = require("./cdn.js"); // cdn配置

// 本地debug配置
let debug = {};
try {
  debug = require("./debug.js");
  console.log("成功载入debug文件,debug配置为 => ");
  console.log(debug);
} catch (e) {
  debug = {};
}
if(debug.project){
    console.log("检测到debug.project配置, 只编译debug.project中的项目=>")
    console.log(debug.project)
    projectConfig.project = debug.project
}

module.exports = {
  build: {
    // 服务器端配置
    env: require("./prod.env"),
    index: path.resolve(__dirname, "../dist/index.html"),
    assetsRoot: path.resolve(__dirname, "../dist"), // 公共资源地址
    assetsSubDirectory: "./" + projectConfig.staticRoot + "/", // 子文件夹前缀 // 在webpack2中编译需要加上后缀/ ，否则会报操作错误Error
    assetsPublicPath: cdn.baseUri + "/" + cdn.basePath + "/", // 静态地址前缀，根据cdn环境配置改变
    productionSourceMap: false, // 是否生成map文件(设成true会额外生成一份map文件方便前端调试，但为了防止反爬虫代码被破解，所以这里用了false)
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    // 本地调试配置
    env: require("./dev.env"),
    port: debug.devPort ? debug.devPort : 8080, // 调试地址端口
    autoOpenBrowser: true,
    assetsSubDirectory: ".", // 子文件夹前缀
    assetsPublicPath: "/",
    proxyTable: {}, // 可以在这里配置端口转发(解决本地调试时的跨域问题),这边为了方便，我就直接在dev-server代码中进行修改了
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
  cdn: cdn, // cdn 相关配置
  projectConfig: projectConfig,
  localServer: debug.localServer ? debug.localServer : {
    filter: function (pathname, req) {
      // 本地调试vue的时候会有跨域问题，所以这里自定义一个过滤器进行检测，命中规则就自动转发到接口地址上去
      // 检测是否有接口标志关键字，有的话就转发过去
      return pathname.indexOf('async') !== -1
    },
    host: {
      target: 'http://lo.yaozeyuan.online/', // 本地mock服务器地址
      changeOrigin: true, // needed for virtual hosted sites
      ws: true // proxy websockets
    }
  }
}
