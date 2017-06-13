// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')
process.env.NODE_ENV = 'production'
var ora = require('ora')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var spinner = ora('building for production...')
spinner.start()
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
// 按静态资源版本号创建目录
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
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
})
