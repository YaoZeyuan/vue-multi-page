'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var htmlTemplateGenerator = require('./plugin/webpack/generate_html_template_list')
var mapJsonGenerator = require('./plugin/webpack/generate_map_json')
const UglifyJsParallelPlugin = require('webpack-uglify-parallel')
const os = require('os')

const env = config.build.env

// 添加'babel-polyfill', 以便兼容安卓4.4以下的版本
// 这里有一个问题，因为js里是按引用传递的，所以如果按照原先的做法直接对baseWebpackConfig.entry进行操作
// 会导致config.project里的配置也会随之变化，导致后续代码出错
// 因此需要单独创建一个变量，避免污染config配置
let projectList = {}
Object.keys(config.projectConfig.project).forEach(function (name) {
  projectList[name] = ['babel-polyfill'].concat(config.projectConfig.project[name])
})
baseWebpackConfig.entry = projectList

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true   // 在这里和vue部分控制是否要将css文件独立出来
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name]_[chunkhash:7]/[name].js'), // 让生成的js按文件名分开，方便查找
    chunkFilename: utils.assetsPath('js/[id].[chunkhash:7].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 混淆，压缩代码
    new UglifyJsParallelPlugin({
      // 多进程压缩js，可以将编译速度提高三倍.
      // 需要注意的是多进程不利于查看bug日志，如果出现编译bug的话需要换成普通模式debug
      workers: os.cpus().length,
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false
    //     },
    //     sourceMap: true
    // }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 用于将css单独打包到一个文件内，但因为现在不单独生成css，所以可以注掉
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name]_[contenthash:7]/[name].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  ].concat(htmlTemplateGenerator.generateHtmlTemplateList(env)).concat([
    // 只生成一个js文件
    // split vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
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
    // }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //  name: 'manifest',
    //  chunks: ['vendor']
    // }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        // 配置静态文件路径
        from: path.resolve(__dirname, '../standalone'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // map.json插件
    mapJsonGenerator.generateMapJson({
      version: config.projectConfig.version,
      // output file path, relative to process.cwd()
      output: './map/' + config.projectConfig.name + '/map_' + config.projectConfig.version + '.json',
      assetsPath: config.build.assetsPublicPath, // 文件前缀地址
      staticRoot: config.projectConfig.staticRoot // 静态资源根路径
    })
  ])
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

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

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
