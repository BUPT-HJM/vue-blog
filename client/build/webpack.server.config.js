const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const base = require('./webpack.base.config')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const { resolve, join } = require('path');
const CLIENT_FOLDER = resolve(__dirname, '../');
let config = merge(base, {
  target: 'node',
  devtool: '#source-map',
  entry: CLIENT_FOLDER + '/src/modules/front/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
  },
  externals: nodeExternals({ 
    // 之前是通过读取package.json
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})
module.exports = config
