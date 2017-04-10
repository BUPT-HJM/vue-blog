const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeModulesPath = resolve(__dirname, 'node_modules');
const CLIENT_FOLDER = resolve(__dirname, 'client');
const SERVER_FOLDER = resolve(__dirname, 'server');
const productionEnv = process.env.NODE_ENV === 'production' ? true : false;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    admin: [
      'webpack-hot-middleware/client?reload=true',
      CLIENT_FOLDER + '/src/modules/admin/main'
    ],
    front: [
      'webpack-hot-middleware/client?reload=true',
      CLIENT_FOLDER + '/src/modules/front/main'
    ]
  },
  output: {
    path: CLIENT_FOLDER + '/dist',
    filename: '[name].js',
    publicPath: '/'
  },
  externals: {},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 开启全局的模块热替换(HMR)

    new webpack.NamedModulesPlugin(),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息,

    new HtmlWebpackPlugin({
      filename: /*'../../server/public/views/index.html'*/ 'admin.html',
      template: CLIENT_FOLDER + '/src/modules/admin/index.html',
      chunks: ['admin'],
      inject: 'body'
    }),

    new HtmlWebpackPlugin({
      filename: /*'../../server/public/views/index.html'*/ 'front.html',
      template: CLIENT_FOLDER + '/src/modules/front/index.html',
      chunks: ['front'],
      inject: 'body'
    }),

    // 配置提取出的样式文件
    new ExtractTextPlugin('css/[name].css'),

    new webpack.DefinePlugin({
      __RELEASE__: JSON.stringify(process.env.NODE_ENV === 'production'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV === 'production' ? 'production' : 'development')
    })
  ],
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          styl: ['vue-style-loader', 'css-loader', 'stylus-loader'],
          stylus: ['vue-style-loader', 'css-loader', 'stylus-loader']
        }
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.styl$/,
      use: ['style-loader', 'css-loader', 'stylus-loader'],
      // use: ExtractTextPlugin.extract({
      //   fallback: "style-loader",
      //   use: ['css-loader', 'stylus-loader']
      // }),
      include: __dirname
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(png|jpg|jpeg|gif|eot|svg|ttf|woff|woff2)$/,
      use: ['file-loader?name=[name].[ext]?[hash]'],
      include: __dirname
    }]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
    }
  },
  cache: true
}

if (process.env.NODE_ENV === 'production') {
  delete config.devtool;
  config.entry.admin.splice(0, 1);
  config.entry.front.splice(0, 1);
  config.output.filename = '[name].[chunkhash:8].min.js';
  config.plugins.splice(0, 2);
  config.plugins = config.plugins.concat([new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }), new webpack.optimize.CommonsChunkPlugin({
    name: "commons"
  })]);
  // for(var key in config.module.rules[0].options.loaders) {
  //   config.module.rules[0].options.loaders[key] = ExtractTextPlugin.extract(config.module.rules[0].options.loaders[key])
  // }
  // console.log(config.module.rules[0].options)
}



module.exports = config;
