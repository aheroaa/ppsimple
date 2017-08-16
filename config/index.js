let path = require('path')
let env = require('./prod.env')
let devenv = require('./dev.env')
let paths = require('../input')
var glob = require('glob')
let pro_path = paths.pro_path

/**
 * get entries from source expression
 * 
 * @method getEntries
 * @param {String} globPath 
 */
let getEntries = function (globPath) {
  console.log(globPath)
  var entries = {}
  glob.sync(globPath).forEach(function (entry) {
    var moduleName = entry.match(/(\w+\/?[-\w]+).\w+$/)[1]

    // type 1: replace directory to a '-' splitted word
    // entries[moduleName.replace('/', '-')] = entry

    // type 2: keep directory stracture in destination place
    entries[moduleName] = entry
  })
  return entries
}

module.exports = {
  pro_path: pro_path,
  src_path: paths.src_path,
  entry: getEntries(path.join(paths.src_path, paths.entry_expr)),
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
