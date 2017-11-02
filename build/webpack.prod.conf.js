let path = require('path')
var fs = require('fs')
let utils = require('./utils')
let webpack = require('webpack')
let config = require('../config')
let merge = require('webpack-merge')
let baseWebPackConfig = require('./webpack.base.conf')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

let env = config.build.env
let webpackConfig = merge(baseWebPackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: false, // config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('[name].js?v=[chunkhash:7]'),
    chunkFilename: utils.assetsPath('[id].js?v=[chunkhash:7]')
  },
  node: {
    'fs': 'empty',
    'path': 'empty',
    'process': false
  },
  resolve: {
    alias: {
      'html-minifier': 'node-noop'
    }
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      except: ['$']  
    }),
    new ExtractTextPlugin(utils.assetsPath('css/[name].css?v=[chunkhash:7]')),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common/js/vendor',
      minChunks: (module, count) => {
        let resource = module.resource
        let flag=  resource && /\.js/.test(resource) && /node_modules|util-.*/.test(resource)
        if(flag){
          // console.log(resource)
        }
        return flag
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common/js/mainfest',
      chunks: ['vendor']
    })
  ]
})

try {
    let copydirs=[]
    if(fs.existsSync(path.join(config.pro_path, 'static'))){
      copydirs.push({
        from: path.resolve(config.pro_path, 'static'),
        to: config.build.assetsRoot,
        ignore: ['.*']
      })
    }
    copydirs=copydirs.concat(config.dirStaticCopy.map(x=>{
      return {
        context: path.resolve(config.src_path),
        from: path.resolve(path.join(config.src_path,"**",x,"*")),
        to: config.build.assetsRoot
      }
    }))
    webpackConfig.plugins.push(      
      new CopyWebpackPlugin(copydirs)
    )
} catch (e) {
  console.log("error",e)
}




if (config.build.productionGzip) {
  let CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}
if (config.build.bundleAnalyzerReport) {
  let BundleAnalyzerPlugin = require('webpack-bundle-analyzer-plugin').BundleAnalyzerPlugin

  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig
