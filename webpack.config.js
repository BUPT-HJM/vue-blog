const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeModulesPath = resolve(__dirname, 'node_modules');
const CLIENT_FOLDER = resolve(__dirname, 'client');
const SERVER_FOLDER = resolve(__dirname, 'server');
const productionEnv = process.env.NODE_ENV === 'production' ? true : false;




let config = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: [
      'webpack-hot-middleware/client?reload=true',
      CLIENT_FOLDER + '/src/main'
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
      filename: /*'../../server/public/views/index.html'*/ 'index.html',
      template: CLIENT_FOLDER + '/index.html',
      inject: 'body'
    }),

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
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  cache: true
}

if (process.env.NODE_ENV === 'production') {
  delete config.devtool;
  config.entry.main.splice(0, 1);
  config.output.filename = '[name].[chunkhash:8].min.js';
  config.plugins.splice(0, 2);
  config.plugins = config.plugins.concat([new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }), new webpack.optimize.CommonsChunkPlugin({
    name: "commons"
  })]);
}



module.exports = config;
