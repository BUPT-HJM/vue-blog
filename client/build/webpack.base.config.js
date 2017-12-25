const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeModulesPath = resolve(__dirname, '../../node_modules');
const CLIENT_FOLDER = resolve(__dirname, '../');
const SERVER_FOLDER = resolve(__dirname, '../../server');
const productionEnv = process.env.NODE_ENV === 'production' ? true : false;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    'modules/admin': [
      'babel-polyfill',
      CLIENT_FOLDER + '/src/modules/admin/app'
    ],
    'modules/front': [
      'babel-polyfill',
      CLIENT_FOLDER + '/src/modules/front/entry-client'
    ]
  },
  output: {
    path: CLIENT_FOLDER + '/dist',
    filename: '[name].js',
    publicPath: '/'
  },
  externals: {
    'simplemde': 'SimpleMDE'
  },
  plugins: [],
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          styl: ['vue-style-loader', 'css-loader?minimize', 'stylus-loader'],
          stylus: ['vue-style-loader', 'css-loader?minimize', 'stylus-loader'],
          css: ['vue-style-loader', 'css-loader?minimize'],
        },
        preserveWhitespace: false,
        postcss: [require('autoprefixer')({ browsers: ['last 7 versions'] })]
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: nodeModulesPath
    }, {
      test: /\.styl$/,
      use: ['style-loader', 'css-loader?minimize', 'stylus-loader'],
      include: CLIENT_FOLDER
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader?minimize']
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [nodeModulesPath],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'vuex$': 'vuex/dist/vuex.esm.js',
      'vue-router$': 'vue-router/dist/vue-router.esm.js',
      'simplemde$': 'simplemde/dist/simplemde.min.js',
      'highlight.js$': 'highlight.js/lib/highlight.js',
      'fastclick': 'fastclick/lib/fastclick.js',
      'lib': resolve(__dirname, '../src/lib'),
      'api': resolve(__dirname, '../src/api'),
      'publicComponents': resolve(__dirname, '../src/components'),
      'serverConfig': resolve(__dirname, '../../server/configs/'),
    }
  },
  //cache: true
}

module.exports = config;
