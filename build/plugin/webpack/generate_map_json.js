'use strict'

let cwd = process.cwd()
let path = require('path')
let fs = require('fs')

let tool = {
  createPathSync: function (dirPath, mode) {
    // 根据字符串形式的路径创建文件夹
    if (fs.existsSync(dirPath)) {
      // 路径已存在，直接返回
      return true
    }
    let pathUri
    // 将路径按分隔符拆分
    dirPath.split(path.sep).forEach(function (subDir) {
      // 依次检查每一级文件夹是否存在，存在跳过，不存在创建之
      if (subDir === '') {
        // 注意，这里有个特殊情况
        // Linux下路径为/home/user/etc,这样分隔之后，第一个路径就是空。。。会导致报错退出，所以需要特殊处理一下
        // 痛心疾首。。。
        subDir = path.sep
      }
      pathUri = pathUri ? path.join(pathUri, subDir) : subDir
      if (!fs.existsSync(pathUri)) {
        if (!fs.mkdirSync(pathUri, mode)) {
          return false
        }
      }
    })
    return true
  }
}

exports.generateMapJson = function (config) {
  config = config || {}
  let assetsPath = config.assetsPath || ''
  let output = config.output || ''
  let version = config.version || ''
  return function () {
    this.plugin('done', function (stats) {
      let json = stats.toJson()
      let assets = json.assets
      // 初始化变量
      let map = {
        'js': {
          'min': {},
          'debug': {}
        },
        'css': {}
      }
      assets.forEach(function (item) {
        // 为编译后的文件逐个生成map路径映射
        let filenameWithoutExt = item.chunkNames[0] // 文件名(不带扩展名)
        let compiledUri = item.name // 编译生成文件的路径URI name => static//multi_vue_demo/0.0.3/js/blog/blog.1e477bedbec46a1512f2.js
        let extSuffix = compiledUri.split('.').pop() // 文件后缀名 => jpg png js ......
        let fileType = item.name.split(version + '/').pop().split('/')[0]
        let uri = '/' + fileType + '/' + filenameWithoutExt + '.' + extSuffix

        if (fileType === 'static') {
          // 如果是静态库中的文件，需要进行特殊处理
          // 静态文件需要重写路径
          // uri 从/static开始，以便与正常css名分开
          uri = '/' + compiledUri.split(version + '/').pop()
          fileType = extSuffix // 重写文件类型&静态资源只需要保留js/css两类
        }

        if (!(fileType === 'js' || fileType === 'css')) {
          // 如果不是js/css/static文件，直接跳过
          return
        }
        // 生成正常的文件路径
        let fileRealPath = assetsPath + compiledUri // \ 在windows上也可以被正确识别，所以直接使用下划线人工合成路径即可
        // 只记录js/css就行，其他的静态资源webpack会自己处理路径
        if (fileType === 'js') {
          map['js']['min'][uri] = fileRealPath
          map['js']['debug'][uri] = fileRealPath
        } else {
          if (!map[fileType]) {
            // 先初始化一下
            map[fileType] = {}
          }
          map[fileType][uri] = fileRealPath
        }
      })

      let webpackOutputFile = path.join(this.outputPath, 'map.json')
      let outputFile = output ? path.resolve(cwd, output) : webpackOutputFile
      let outputDir = path.dirname(outputFile)
      tool.createPathSync(outputDir) // 根据输入路径直接建立一系列文件夹

      fs.writeFileSync(outputFile, JSON.stringify(map, null, 2))
    })
  }
}
