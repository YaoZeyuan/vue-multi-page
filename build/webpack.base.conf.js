var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var projectRoot = path.resolve(__dirname, '../')
const os = require('os');
const HappyPack = require('happypack');
const happThreadPool = HappyPack.ThreadPool({size: os.cpus().length}); // 采用多进程，进程数由CPU核数决定
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    cache: true, // 开启webpack的默认缓存
    entry: config.project_config.project, // 根据不同的入口生成对应的app.js
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    plugins: [
        // ...
        new HappyPack({
            id: 'js',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happThreadPool
        })
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'happypack/loader?id=js' // 将loader换成happypack
                    }
                }
            },
            {
                test: /\.js$/,
                loader: ['happypack/loader?id=js'], // 将loader换成happypack
                include: [path.join(projectRoot, 'src')],
                exclude: [path.join(projectRoot, 'node_modules')]
            },
            {
                // 图片资源处理器
                // 10kb以下数据直接转为base64,否则置于img/文件夹中
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                // 字体资源处理器
                // 10kb以下数据直接转为base64,否则置于fonts/文件夹中
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}
