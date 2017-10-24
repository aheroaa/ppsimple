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
  entry: utils.getEntries(path.join(paths.src_path, paths.entry_expr),path.join(paths.src_path,'js')),
  build: {
    env: env.NODE_ENV,
    index: path.resolve(pro_path, paths.asset_path, 'index.html'),
    assetsRoot: path.resolve(pro_path, paths.asset_path),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: devenv,
    port: paths.devport,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',  // path.resolve(pro_path, paths.asset_path),
    proxyTable: {},
    cssSourceMap: false
  }
}
