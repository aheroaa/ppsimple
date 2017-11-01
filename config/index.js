let path = require('path')
let utils = require('./utils')
let env = require('./prod.env')
let devenv = require('./dev.env')
let paths = require('../input')
var glob = require('glob')
let pro_path = paths.pro_path
module.exports = {
  pro_path: pro_path,
  src_path: paths.src_path,
  entry: utils.getEntries(path.join(paths.src_path, paths.entry_expr), path.join(paths.src_path)),
  build: {
    env: env.NODE_ENV,
    // 首页
    index: path.resolve(pro_path, paths.asset_path, 'index.html'),
    // 资源目录
    assetsRoot: path.resolve(pro_path, paths.asset_path),
    // 资源发布目录
    assetsPublicPath: paths.asset_public_path,
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    after: (app) => {},
    // allowedHosts: [],
    before: (app) => {},
    // bonjour: true,
    clientLogLevel: 'info', // none error warning info
    // color: true,
    // compress: true,
    // contentBase: 'd:\\',
    disableHostCheck: true,
    // filename: '', // 在惰性模式中，此选项可减少编译。 默认在惰性模式，每个请求结果都会产生全新的编译。使用 filename，可以只在某个文件被请求时编译。
    // headers: {},
    // host: '0.0.0.0',
    // hot: true,
    hotOnly: true, // Enables Hot Module Replacement (see devServer.hot) without page refresh as fallback in case of build failures.
    // https: false,
    inline : false, // false to iframe
    // lazy: false,  // 当启用 lazy 时，dev-server 只有在请求时才编译包(bundle)。这意味着 webpack 不会监视任何文件改动。我们称之为“惰性模式”。
    noInfo: true, // 启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
    open: true, // When open is enabled, the dev server will open the browser.
    openPage: 'index.html', // Specify a page to navigate to when opening the browser.
    // overlay: true,            //  {warnings: true,errors: true}
    // pfx: '',
    // pfxPassphrase: '',
    port: paths.devport,
    // proxy: {},
    // progress: true,    // cli
    // public: "myapp.test:80", 
    publicPath: '/',
    // quiet: true,
    // socket: 'socket',
    stats: {
      colors: true
    },
    useLocalIp: true,
    // watchContentBase: true, // Tell the server to watch the files served by the devServer.contentBase option. File changes will trigger a full page reload.
    // watchOptions: {}
  }
}
