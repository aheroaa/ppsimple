/* eslint-disable */
require('eventsource-polyfill')
let config = require('../config')
let port = process.env.PORT || config.dev.port
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true&path=http://localhost:'+port+'/__webpack_hmr')


hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
