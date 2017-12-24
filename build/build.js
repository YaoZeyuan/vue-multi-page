'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

let shell = require('shelljs')
let ora = require('ora')
let path = require('path')
let chalk = require('chalk')
let webpack = require('webpack')
let config = require('../config')
let webpackConfig = require('./webpack.prod.conf')

let spinner = ora('building for production...')

console.log('清空缓存资源')
let distPath = path.resolve(__dirname, '../dist')
let mapPath = path.resolve(__dirname, '../map')
console.log(`dist_path => ${distPath}`)
console.log(`map_path => ${mapPath}`)
if (typeof distPath !== 'string' || distPath.length < 3 || typeof mapPath !== 'string' || mapPath.length < 3) {
  console.warn('distPath/mapPath长度过短，自动退出')
  shell.exit(10004)
}
shell.rm('-rf', distPath)
shell.rm('-rf', mapPath)
console.log('缓存资源清理完毕')
console.log('')

spinner.start()

let assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
// 按静态资源版本号创建目录
console.log(`assetsPath => ${assetsPath}`)
if (typeof assetsPath !== 'string' || assetsPath.length < 3) {
  console.warn('assetsPath长度过短，自动退出')
  shell.exit(10005)
}
shell.rm('-rf', assetsPath)
shell.mkdir('-p', assetsPath)
webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))

  console.log('项目编译完毕')
  console.log('')
  console.log(`cdn上传命令demo(` + (process.env.CDN_ENV ? process.env.CDN_ENV : 'local') + `环境) => `)
  console.log('上传静态资源 => ' + `qiniu-upload(仅供参考) './dist/${config.projectConfig.name}/**/*' --base='${config.cdn.basePath}/${config.projectConfig.name}/'     --url=${config.cdn.uploadUri} --timeout=600000   --user='${config.cdn.account}' --password=${config.cdn.password}`)
  console.log('上传map.json => ' + `qiniu-upload(仅供参考) './map/${config.projectConfig.name}/**/*' --base='${config.cdn.basePath}/${config.projectConfig.name}/map/'  --url=${config.cdn.uploadUri} --timeout=600000   --user='${config.cdn.account}' --password=${config.cdn.password}`)
  console.log('')
  console.log('上传完成后的map.json地址 => ' + `${config.build.assetsPublicPath}/${config.projectConfig.name}/map/map_${config.projectConfig.version}.json`)
  console.log('')
})
