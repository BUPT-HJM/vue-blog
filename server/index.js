"use strict";

import koa from 'koa';
import convert from 'koa-convert';
import onerror from 'koa-onerror';
import serve from 'koa-static';
import mongoose from 'mongoose';
import historyApiFallback from 'koa-connect-history-api-fallback';
import config from './configs';
import middleware from './middleware'
import api from "./api";

mongoose.Promise = Promise;
// connect mongodb
mongoose.connect(config.mongodb.url);
mongoose.connection.on('error', console.error);

const app = new koa();

// middleware
app.use(middleware());
onerror(app);

// api/router
app.use(api());

app.use(serve('./client/static'));

app.use(convert(historyApiFallback({
  verbose: true,
  index: '/front.html',
  rewrites: [
    { from: /^\/admin$/, to: '/admin.html'},
    { from: /^\/admin\/login/, to: '/admin.html'},
    { from: /^\/$/, to: '/front.html'},
    { from: /^\/article/, to: '/front.html'}
  ]
})))


if (process.env.NODE_ENV !== 'production') {
  const koaWebpack = require('koa-webpack');
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');
  let compiler = webpack(webpackConfig);
  app.use(koaWebpack({
    compiler: compiler,
    // config: {
    // },
    dev: {
      //noInfo: true,
      stats: {
        colors: true,
        chunks: false
      },
      publicPath: webpackConfig.output.publicPath,
    }
  }));
} else {
  console.log('prod');
  app.use(serve('./client/dist'));
}

// create server
app.listen(config.app.port, () => {
  console.log('The server is running at http://localhost:' + config.app.port);
});

export default app;
