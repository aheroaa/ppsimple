require('./check-versions')()

const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.conf')
const WebpackDevServer = require('webpack-dev-server');
const cors = require('cors')
const options = require('../config').dev
let config = require('../config')

WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler,options);

let port =process.env.PORT || options.port 

server.listen( port , '0.0.0.0', () => {
  console.log('Starting server');
});



