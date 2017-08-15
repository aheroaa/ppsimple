let utils = require('./utils')
let config = require('../config')
let paths = require('../input')
let vueLoaderConfig = require('./vue-loader.conf')

module.exports = {
  entry: config.entry,
  output: {
    path: config.build.assetsRoot, // config.build.assetsPublicPath, 
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [paths.src_path],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        } // ,
        // include: [paths.src_path]
      },
      {
        test: /\.scss$/,
        use: ['style', 'css', 'reolve-url', 'sass'].map(x => ({
          loader: x + '-loader'
        }))
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]?v=[hash:7')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]?v=[hash:7]')
        }
      }
    ]
  }
}
