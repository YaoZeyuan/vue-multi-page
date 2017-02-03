var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var html_template_generator = require('./plugin/webpack/generate_html_template_list')
var map_json_generator = require('./plugin/webpack/generate_map_json')
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true   // 在这里和vue部分控制是否要将css文件独立出来
        })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name]_[chunkhash]/[name].js'), //让生成的js按文件名分开，方便查找
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
        static_root: config.project_config.static_root,// 静态资源地址
    },
    vue: {
        loaders: utils.cssLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: false // 在这里和module部分控制是否要将css文件独立出来
        })
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // 混淆，压缩代码
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 用于将css单独打包到一个文件内，但因为现在不单独生成css，所以可以注掉
        new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    ].concat(html_template_generator.generate_html_template_list(env)).concat([
        // 只生成一个js文件
        // split vendor js into its own file
        //new webpack.optimize.CommonsChunkPlugin({
        //  name: 'vendor',
        //  minChunks: function (module, count) {
        //    // any required modules inside node_modules are extracted to vendor
        //    return (
        //      module.resource &&
        //      /\.js$/.test(module.resource) &&
        //      module.resource.indexOf(
        //        path.join(__dirname, '../node_modules')
        //      ) === 0
        //    )
        //  }
        //}),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        //new webpack.optimize.CommonsChunkPlugin({
        //  name: 'manifest',
        //  chunks: ['vendor']
        //}),
        // map.json插件
        map_json_generator.generate_map_json({
            // output file path, relative to process.cwd()
            output: './map/' + config.project_config.name + '/map-' + config.project_config.version + '.json',
            assetsPath: config.build.assetsPublicPath, // 文件前缀地址
            static_root: config.project_config.static_root, // 静态资源根路径
        })
    ])
})

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

module.exports = webpackConfig
