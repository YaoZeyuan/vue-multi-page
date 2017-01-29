# vue-multi-page
vue多页面实践之路

##  实现思路：
1.  通过vue-cli，搭建出一套基础的vue框架
2.  通过修改框架代码，实现多页面结构的支持

##  具体实现

0.  默认系统环境及配置软件
    1.  Windows 10 + PowerShell
    2.  ConEmu
        可能是目前最好用的Windows终端，用户体验堪比Ubuntu自带的Terminal
    3.  VSCode
        有固态硬盘支持的情况下Windows平台中最好用的文本编辑器
    4.  WebStrom
        js开发必备ide，具体设置后边会详细介绍


1.  初始化Git目录
    1.  略过，参考提交记录
2.  安装配置基础工具
    1.  nodejs
    2.  npm
        1.  npm配置
            1.  由于GFW的原因, 用npm默认源是基本没法下载代码包的，所以需要切换成淘宝的源
                1.  执行命令  
                    ` npm config set registry="http://registry.npm.taobao.org" `

    3.  安装vue-cli
        1.  切换到待初始化vue项目的目录下, 执行命令 `npm install vue-cli`
            [npm-install-vue-cli](./img/npm-install-vue-cli.png)
    4.  创建基础的vue项目(vue2.0 + webpack)
        执行命令：`vue init webpack muilt-page-vue` ( 创建一个名为muilt-page-vue, 以webpack模版作为基底的vue项目, 更多选项参见[vue-cli的说明文档](https://github.com/vuejs/vue-cli))
        [init-muilt-page-vue-project](./img/init-muilt-page-vue-project.png)
        这里直接使用的默认选项，没有添加各种扩展的代码测试工具(普通开发基本用不着)
    5.  初始化vue项目
        正如创建项目后提示的那样，cd到对应项目目录，然后执行`npm install`（安装各种依赖）, `npm run dev`(进入vue的dev开发模式)
