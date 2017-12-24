'use strict'
// 使用"use strict"前缀以启用ES6语法

const VcsTypeHg = 'hg'
const VcsTypeGit = 'git'

let fs = require('fs')
const exit = require('shelljs')
const ChildProcess = require('child_process')

let projectConfig = {
  name: 'multi_vue_demo',
  vcsType: VcsTypeGit, // 设定版本控制工具，用于自动获取版本号
  version: 'undefined', // 如果使用hg/git进行的版本控制的话, 不需要填写该项, 由脚本自动检测tag即可
  staticRoot: '', // 不需要填写, 由name和version自动生成
  project: {
    // 项目列表

        // 组织格式 ： 项目名 => 以项目根目录为基准的index.vue路径
        // 其在webpack中的对应格式为：[name](生成的js名) => [main.js所在路径]
        demo: './src/view/demo', // 示例项目，新建页面可以直接复制该项目的代码
        // blog: './src/view/blog', // 示例项目，利用个人blog提供公共api进行测试
    }
}

// 根据版本管理工具获取项目版本号
switch (projectConfig.vcsType) {
  case VcsTypeGit:
    // 获取版本库最新tag值
    let lastGitTagHash = ChildProcess.execSync('git rev-list --tags --max-count=1')
      .toString().trim()
    console.log('last git tag hash => ')
    console.log(lastGitTagHash)
    if (lastGitTagHash) {
      console.log(lastGitTagHash)
      let lastGitTag = ChildProcess.execSync(`git describe --tags ${lastGitTagHash}`)
        .toString().trim()
      if (lastGitTag) {
        console.log('last git tag => ')
        console.log(lastGitTag)
        projectConfig.version = lastGitTag
      } else {
        console.error('项目版本号解析失败，使用undefined作为默认版本号')
      }
    } else {
      console.error('没有在项目中解析到版本号，使用undefined作为默认版本号')
    }
    break
  case VcsTypeHg:
    let hgTagContent = fs.readFileSync('./.hgtags', 'utf8') // 获取hgtags的内容
    let hgVersion  = hgTagContent.trim().split(' ').pop().toString().trim() // 直接trim后取最后一行，以空格分隔获取最新版本号
    if(hgVersion){
      projectConfig.version = hgVersion
    }else{
      console.error('没有在项目中解析到版本号，使用undefined作为默认版本号')
    }
    break
  default:
    console.error('版本控制工具解析失败，终止运行')
    exit(1001)
}

if (!projectConfig.version) {
  console.error('项目版本号解析失败，终止运行')
  exit(1002)
}

// 合成静态资源路径
projectConfig.staticRoot = projectConfig.name + '/' + projectConfig.version

// 导出
module.exports = projectConfig
