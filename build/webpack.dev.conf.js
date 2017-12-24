'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
let htmlTemplateGenerator = require('./plugin/webpack/generate_html_template_list')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
// 这里有一个问题，因为js里是按引用传递的，所以如果按照原先的做法直接对baseWebpackConfig.entry进行操作
// 会导致config.project里的配置也会随之变化，导致后续代码出错
// 因此需要单独创建一个变量，避免污染config配置
let projectList = {}
Object.keys(config.projectConfig.project).forEach(function (name) {
    projectList[name] = ['./build/dev-client'].concat(config.projectConfig.project[name])
})
baseWebpackConfig.entry = projectList

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-source-map', // eval-source-map只能看，不能调试，得不偿失
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
    // https://github.com/ampedandwired/html-webpack-plugin
  ].concat(htmlTemplateGenerator.generateHtmlTemplateList(config.dev.env))
    .concat([new FriendlyErrorsPlugin()]) // 不能用push,push的返回值是数组的长度，不是数组本身。。。
})
