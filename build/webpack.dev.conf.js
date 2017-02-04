var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var html_template_generator = require('./plugin/webpack/generate_html_template_list')
var env = config.dev.env
var FriendlyErrors = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
// 这里有一个问题，因为js里是按引用传递的，所以如果按照原先的做法直接对baseWebpackConfig.entry进行操作
// 会导致config.project里的配置也会随之变化，导致后续代码出错
// 因此需要单独创建一个变量，避免污染config配置
let project_list = {};
Object.keys(config.project_config.project).forEach(function (name) {
    project_list[name] = ['./build/dev-client'].concat(config.project_config.project[name])
})
baseWebpackConfig.entry = project_list

module.exports = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
    ].concat(html_template_generator.generate_html_template_list(env)).concat([new FriendlyErrors()]) // 不能用push,push的返回值是数组的长度，不是数组本身。。。
})
