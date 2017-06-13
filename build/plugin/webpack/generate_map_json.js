"use strict"
/**
 * Created by yaoze on 2016/9/28.
 */
let cwd = process.cwd();
let path = require('path');
let fs = require('fs');
let tool = {
    create_path_sync: function (dir_path, mode) {
        // 根据字符串形式的路径创建文件夹
        if (fs.existsSync(dir_path)) {
            // 路径已存在，直接返回
            return true;
        }
        let path_uri;
        // 将路径按分隔符拆分
        dir_path.split(path.sep).forEach(function (sub_dir) {
            // 依次检查每一级文件夹是否存在，存在跳过，不存在创建之
            if (sub_dir == '') {
                // 注意，这里有个特殊情况
                // Linux下路径为/home/user/etc,这样分隔之后，第一个路径就是空。。。会导致报错退出，所以需要特殊处理一下
                // 痛心疾首。。。
                sub_dir = path.sep
            }
            path_uri = path_uri ? path.join(path_uri, sub_dir) : sub_dir;
            if (!fs.existsSync(path_uri)) {
                if (!fs.mkdirSync(path_uri, mode)) {
                    return false;
                }
            }
        });
        return true;
    },
}
exports.generate_map_json = function (config) {
    config = config || {};
    let assetsPath = config.assetsPath || '';
    let output = config.output || '';
    let static_root = config.static_root || '';
    return function () {
        this.plugin('done', function (stats) {
            let json = stats.toJson();
            let assets = json.assets;
            // 初始化变量
            let map = {
                'js': {
                    'min': {},
                    'debug': {},
                },
                'css': {}
            };
            assets.forEach(function (item) {
                // 为编译后的文件逐个生成map路径映射
                let filename = item.chunkNames[0]; // 正常的文件名(不含扩展名)
                let compiled_uri = item.name; // 编译生成文件的路径URI name => static/growth/0.0.3/js/signin/signin.1e477bedbec46a1512f2.js
                let ext_suffix = path.extname(compiled_uri); // 文件后缀名 => .jpg .png .js ......
                if (!(ext_suffix == '.js' || ext_suffix == '.css')) {
                    // 如果不是js/css文件，直接跳过
                    return;
                }
                // 生成正常的文件路径
                let uri = ext_suffix == '.js' ? '/js/' : '/css/';
                uri += filename + ext_suffix;
                let file_real_path = assetsPath + '/' + compiled_uri; // \ 在windows上也可以被正确识别，所以直接使用下划线人工合成路径即可
                if (ext_suffix == '.js') {
                    map['js']['min'][uri] = file_real_path
                    map['js']['debug'][uri] = file_real_path
                } else {
                    // 一定是js/css两者之一
                    map['css'][uri] = file_real_path
                }
            });
            let webpackOutputFile = path.join(this.outputPath, 'map.json');
            let outputFile = output ? path.resolve(cwd, output) : webpackOutputFile;
            let outputDir = path.dirname(outputFile);
            tool.create_path_sync(outputDir); // 根据输入路径直接建立一系列文件夹
            // @todo 这里需要额外读取src/assert文件夹下的文件，font/img/medis里的文件也要生成对应的map.json
            // @todo 或者，只要加一个静态资源目录即可
            map['static_root'] = static_root; // 静态资源路径,所有的静态资源都在此路径下,由前端自行拼接即可
            fs.writeFileSync(outputFile, JSON.stringify(map, null, 2));
        });
    }
};
