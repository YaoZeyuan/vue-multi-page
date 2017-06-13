"use strict"
// 在WebPack相关代码中使用ES6语法必须添加"use strict"前缀
// 扩展配置说明
// 获取项目版本号，用以生成目录
let fs = require("fs")
let name = 'multi_vue_demo' // 项目名，提取出来以方便dev环境使用，否则会出现undefined = =
let vcs_type = '' // 设定版本控制工具，用于自动获取版本号，默认是0.0.1
let version = ''
if (vcs_type == 'git') {
    // git项目获取版本号
    version = fs.readdirSync('./.git/refs/tags').pop().trim()// 获取版本库最新tag值
} else {
    if (vcs_type == 'hg') {
        // hg项目获取版本号
        let tag_content = fs.readFileSync("./.hgtags", 'utf8') // 获取hgtags的内容
        version = tag_content.trim().split(' ').pop() // 直接trim后取最后一行，以空格分隔获取最新版本号
    } else {
        version = '1.0.0'
    }
}
module.exports = {
    // 方便当出现多项目、多页面需求时的进一步扩展。不能与其他项目重名
    name: name, // 项目名：multi_vue_demo。
    version: version, // 版本号，据此生成map.json与项目目录
    static_root: name + '/' + version,// 静态资源路径(线上的assets,html,js文件夹所在路径)
    project: {
        // 项目列表
        // 组织格式 ： 项目名 => 以项目根目录为基准的index.vue路径
        // 其在webpack中的对应格式为：[name](生成的js名) => [main.js所在路径]
        demo: './src/view/demo', // 示例项目，新建页面可以直接复制该项目的代码
        blog: './src/view/blog', // 示例项目，利用个人blog提供公共api进行测试
    },
};
