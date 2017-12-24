const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeModulesPath = resolve(__dirname, '../../node_modules');
const CLIENT_FOLDER = resolve(__dirname, '../');
const SERVER_FOLDER = resolve(__dirname, '../../server');
const productionEnv = process.env.NODE_ENV === 'production' ? true : false;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge')
const base = require('./webpack.base.config');

let config = merge(base, {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 开启全局的模块热替换(HMR)

    new webpack.NamedModulesPlugin(),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息,

    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: CLIENT_FOLDER + '/src/modules/admin/index.html',
      inject: 'body',
      chunks: productionEnv ? ['modules/manifest_admin', 'modules/vendor_admin', 'modules/admin'] : ['modules/admin'],
      minify: { // 压缩的方式
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      //chunksSortMode: 'dependency'
    }),

    new HtmlWebpackPlugin({
      filename: 'front.html',
      template: CLIENT_FOLDER + '/src/modules/front/index.html',
      //inject: 'body',
      //inject: false,
      chunks: productionEnv ? ['modules/manifest_front', 'modules/vendor_front', 'modules/front'] : ['modules/front'],
      minify: { // 压缩的方式
        //removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
      //chunksSortMode: 'dependency'
    }),
    // 配置提取出的样式文件
    new ExtractTextPlugin('css/[name].[contenthash].css'),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
  ]
})
config.entry['modules/admin'].unshift('event-source-polyfill', 'webpack-hot-middleware/client?reload=true')
config.entry['modules/front'].unshift('event-source-polyfill', 'webpack-hot-middleware/client?reload=true')

if (process.env.NODE_ENV === 'production') {
  // 删除devtool
  delete config.devtool;
  // 删除webpack-hot-middleware
  config.entry['modules/admin'].splice(0, 2);
  config.entry['modules/front'].splice(0, 2);
  config.output.filename = '[name].[chunkhash:8].min.js';
  // 提取css
  config.module.rules[0].options.loaders = {
    styl: ExtractTextPlugin.extract({
      use: [{
        loader: 'css-loader',
        options: {
          minimize: true,
          sourceMap: true
        }
      }, {
        loader: 'stylus-loader',
        options: {
          sourceMap: true
        }
      }],
      fallback: 'vue-style-loader'
    }),
    stylus: ExtractTextPlugin.extract({
      use: [{
        loader: 'css-loader',
        options: {
          minimize: true,
          sourceMap: true
        }
      }, {
        loader: 'stylus-loader',
        options: {
          sourceMap: true
        }
      }],
      fallback: 'vue-style-loader'
    }),
    css: ExtractTextPlugin.extract({
      use: [{
        loader: 'css-loader',
        options: {
          minimize: true,
          sourceMap: true
        }
      }],
      fallback: 'vue-style-loader'
    })
  };
  // 删除HotModuleReplacementPlugin和NamedModulesPlugin
  config.plugins.shift();
  config.plugins.shift();
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告  
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    }),
    // 分别提取vendor、manifest
    new webpack.optimize.CommonsChunkPlugin({
      name: 'modules/vendor_admin',
      chunks: ['modules/admin'],
      minChunks: function(module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            nodeModulesPath
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'modules/manifest_admin',
      chunks: ['modules/vendor_admin']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'modules/vendor_front',
      chunks: ['modules/front'],
      minChunks: function(module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            nodeModulesPath
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'modules/manifest_front',
      chunks: ['modules/vendor_front']
    }),
    // copy static 
    new CopyWebpackPlugin([{
      from: CLIENT_FOLDER + '/static',
      to: CLIENT_FOLDER + '/dist/static',
      ignore: ['.*']
    }])
  ]);
}
console.log(config)
module.exports = config;
