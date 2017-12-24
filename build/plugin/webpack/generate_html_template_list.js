'use strict'
let config = require('../../../config')
let HtmlWebpackPlugin = require('html-webpack-plugin')

// 生成html模版配置
// 传入参数env : 当前环境配置信息
function generateChunks (project, env) {
  let chunks = [
    project,
    'manifest',
    'vendor'
  ]
  if (env.NODE_ENV !== 'production') {
    // 当环境不为production线上时
    // 额外注入热加载代码
    // 以实现文件的实时更新
    // add hot-reload related code to entry chunks
    chunks.push('./build/dev-client')
  }
  return chunks
}

exports.generateHtmlTemplateList = (env) => {
  // 根据配置生成不同的html
  let templateList = []
  for (let project of Object.keys(config.projectConfig.project)) {
    let htmlTemplateConfig = {
      filename: config.build.assetsSubDirectory + '/html/' + project + '/index.html',
      template: config.projectConfig.project[project] + '/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // 生成html的时候只需要引入项目js代码[project]，公共js代码[vendor]即可，不需要再引入资源文件mainfest了
      chunks: generateChunks(project, env),
      chunksSortMode: 'dependency'// 按照依赖关系注入script标签，否则【一定】会造成代码无法运行！
    }
    templateList.push(
      // generate dist index.html with correct asset hash for caching.
      // you can customize output by editing /index.html
      // see https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin(htmlTemplateConfig)
    )
  }
  return templateList
}

