// /**
//  * 该配置用于在map.json中生成静态资源路径
//  * 真正的cdn发布操作由系统命令进行
//  *
//  * qiniu-upload './dist/multi_vue_demo/**/*' --base='/线上基路径/'  --url='http://qiniu.com/zip_upload'  --timeout=60000   --user='qiniu_account' --password=123456
//  * qiniu-upload './map/multi_vue_demo/**/*' --base='/线上基路径/map/multi_vue_demo/'  --url='http://qiniu.com/zip_upload' --timeout=60000     --user='qiniu_account'  --password=123456
//  *
//  * 线上发布环境常量
//  * 账号: qiniu_account
//  * 密码: $CI_UPLOAD_PASSWORD
//  *
//  * Created by yaoze on 2017/7/3.
//  */

const Upload_Time_Out = 600000  // 上传文件超时报错时间(毫秒,即使考虑到图片的话，600秒也足够了)
let dev = {
    basePath: '/线上基路径/multi_vue_demo/', // cdn上的目录名 + 项目名
    baseUri: 'http://dev.static.yaozeyuan.online/', // cdn域名
    // 以下内容仅用于提示上传cdn命令，在项目中没有实际用途
    account: 'qiniu_account', // 账户
    password: '123456', // 密码
    uploadUri: 'http://dev.qiniu.com/zip_upload' // cdn 上传地址
}
let rd = {
    basePath: '/线上基路径/multi_vue_demo/', // cdn上的目录名 + 项目名
    baseUri: 'http://rd.static.yaozeyuan.online/', // cdn域名
    // 以下内容仅用于提示上传cdn命令，在项目中没有实际用途
    account: 'qiniu_account', // 账户
    password: '123456', // 密码
    uploadUri: 'http://rd.qiniu.com/zip_upload' // cdn 上传地址
}
let prod = {
    basePath: '/线上基路径/multi_vue_demo',
    baseUri: '//static.yaozeyuan.online/', // 前端网址前缀
    // 以下内容仅用于提示上传cdn命令，在项目中没有实际用途
    account: 'qiniu_account',
    password: '$VUE_UPLOAD_PASSWORD', // prod环境 cdn 上传账号&密码, (需要在gitlab 里的/settings/ci_cd#Secret Variables中配置对应的环境变量)
    uploadUri: 'http://prod.qiniu.com/zip_upload'
}
let local = {
    basePath: '/',
    baseUri: `http://localhost:8000/`,
    // 以下内容仅用于提示上传cdn命令，在项目中没有实际用途
    account: 'none',
    password: 'none',
    uploadUri: 'localhost'
}

let exportConfig = {}
switch (process.env.CDN_ENV) {
    case 'prod':
        exportConfig = prod
        break
    case 'rd':
        exportConfig = rd
        break
    case 'local':
        exportConfig = local
        break
    default:
        // 默认是本地环境
        exportConfig = local
        break
}
module.exports = exportConfig
