/* eslint-disable */
require('eventsource-polyfill')
let port= require('../input').devport


var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true&path=http://localhost:6001/__webpack_hmr')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
