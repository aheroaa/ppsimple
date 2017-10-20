require('./check-versions')()

let config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

let opn = require('opn')
let path = require('path')
let express = require('express')
let cors = require('cors')
let webpack = require('webpack')
let proxyMiddleware = require('http-proxy-middleware')
let webpackConfig = require('./webpack.dev.conf')


let port = process.env.PORT || config.dev.port
let autoOpenBrowser = !!config.dev.autoOpenBrowser
let proxyTable = config.dev.proxyTable

let app = express()
let compiler = webpack(webpackConfig)

let devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
app.use(cors())
let hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    console.log(11)
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

Object.keys(proxyTable).forEach(context => {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})
app.use(require('connect-history-api-fallback')())
app.use(devMiddleware)
app.use(hotMiddleware)

let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))





let uri = 'http://localhost:' + port

let _resolve
let readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server ...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')

  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }

  _resolve()
})

let server = app.listen(port)

exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
