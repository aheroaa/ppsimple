let utils = require('./utils')
let config = require('../config')
let paths = require('../input')
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let vueLoaderConfig = require('./vue-loader.conf')


let webpackConfig={
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
      //   exclude: /\.min\.(js|css)/,
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
          name: utils.assetsPath('img/[name].[ext]?v=[hash:7]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]?v=[hash:7]')
        }
      },
      {
        test: /\.art$/,
        loader: 'raw-loader'
      }
    ]
  }
}

webpackConfig.plugins=webpackConfig.plugins || []


let pages = utils.getEntries(path.join(config.src_path, '**/*.html'), path.join(config.src_path))
for (var page in pages) {  
  let conf = {
    filename: page + '.html',
    template: pages[page],
    inject: true,
    chunkSortMode: 'dependency',
    minify: {
      removeComments: true,
      removeAttributeQuotes: true,
      collapseWhitespace: false
    },
    chunks: Object.keys(config.entry).filter(x => {
      return x.replace(/js[\/\\]*/,'') === page.replace(/html[\/\\]*/,'') 
    }).concat(['common/js/vendor','common/js/mainfest'])
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
}




module.exports = webpackConfig