#   muilt-page-vue使用指南

项目说明：

项目基于vue-cli创建，可以作为vue-cli的多页面版使用

使用方法:

0.  安装[node.js](https://nodejs.org/zh-cn/)

1.  下载项目，执行`npm install`安装依赖

2.  复制`/src/view/demo`目录为任意新项目名，在`/config/project`的project属性中添加【项目名】=>【项目路径】的对应关系，即可开始新页面的编辑

3.  执行`npm run dev`进入开发模式，`http://localhost:8080/【项目名】/【tag号】/html/【页面名】/index.html`即为对应的调试地址，档本地文件后，系统会自动重新打包编译并载入新的vue代码，非常方便
调试地址示例[http://localhost:8080/multi_vue_demo/0.0.2/html/demo/index.html](http://localhost:8080/multi_vue_demo/0.0.2/html/demo/index.html)

4.  执行`npm run build`编译代码，编译后的代码会输出到`/dist`目录下

5.  扩展说明
    1.  项目名
        1.  需要设置一个基础的项目名，在`/config/project.js`中进行设置，默认是`multi_vue_demo`
    2.  版本号与map.json
        1.  在理想情况下，网页端输出js/css代码时只需要写一行`<script src="{{STATIC 'js/demo.js'}}" ></script>`，然后在渲染的时候通过`map.json`将文件名替换为真实地址即可。

            这时候就需要

            1.  在编译时生成带有文件名和真实地址对应关系的map.json
            2.  在生成map.json时带上对应的版本号，方便发布和回滚

            所以plugin里的generate_map_json就是为了解决这个问题添加的。使用的时候只要在`/config/project.js`中设定上vcs_type(git或hg)，每次发布代码之后打上tag即可

        2.  如果是个人小项目，不需要使用map.json插件的话，可以在`/build/webpack.prod.conf.js`中，将`[chunkhash]`、`[id]`等唯一标识符去掉，再编译出的文件名中就不会有随机字符串了。这样在使用时，通过动态时间戳绕过缓存，就可以正常使用vue编译出的js/css文件了
    3.  跨域调试

        vue本地调试中最大的问题就是如何解决跨域问题，vue-cli中提供了http-proxy-middleware作为端口转发的配置，可以在调试时本地虚拟一个服务端接收请求并代为转发该请求，这样就解决了跨域问题(http://www.jianshu.com/p/95b2caf7e0da)

        但是直接使用proxy-table配置有一个问题在于，有一个接口就要写一次配置，使用起来很麻烦，而在绝大多数情况下一个vue项目只会有一个对应的api域名，所以建议直接修改`/build/dev-server.js`文件，将所有非html请求全部转发到api域名下，这样会更方便些

        示例代码如下

            // proxy api requests
            // Object.keys(proxyTable).forEach(function (context) {
            //     var options = proxyTable[context]
            //     if (typeof options === 'string') {
            //         options = {target: options}
            //     }
            //     app.use(proxyMiddleware(context, options))
            // })

            // 本地调试vue的时候会有跨域问题，所以这里自定义一个过滤器进行检测，命中规则就自动转发到接口地址上去
            let customer_filter = function (pathname, req) {
               // 检测是否有接口标志关键字，有的话就转发过去
               return pathname.indexOf('async') != -1
            }
            app.use(proxyMiddleware(customer_filter, {
                target: 'http://x.lo.jumei.com/', // target host
                changeOrigin: true,               // needed for virtual hosted sites
                ws: true,                         // proxy websockets
            }))

        这段代码由于通用性原因，并没有添加到项目代码里，有需要的同学自行添加即可