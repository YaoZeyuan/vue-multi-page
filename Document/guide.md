#   muilt-page-vue使用指南

项目说明：

项目基于vue-cli创建，可以作为vue-cli的多页面版使用

使用方法:

1.  下载项目，执行`npm install`安装依赖

2.  复制`./src/view/demo`目录为任意新项目名，在`/config/project`的project属性中添加【项目名】=>【项目路径】的对应关系，即可开始新页面的编辑

3.  执行`npm run dev`进入开发模式，`http://localhost:8080/【项目名】/【tag号】/html/【页面名】/index.html`即为对应的调试地址，档本地文件后，系统会自动重新打包编译并载入新的vue代码，非常方便
调试地址示例[http://localhost:8080/multi_vue_demo/0.0.2/html/demo/index.html](http://localhost:8080/multi_vue_demo/0.0.2/html/demo/index.html)

4.