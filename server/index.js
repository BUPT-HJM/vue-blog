"use strict";

import koa from 'koa';
import convert from 'koa-convert';
import onerror from 'koa-onerror';
import serve from 'koa-static';
import mongoose from 'mongoose';
import historyApiFallback from 'koa-history-api-fallback';
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
  verbose: false
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
        colors: true
      },
      publicPath: webpackConfig.output.publicPath,
    }
  }));
} else {
  app.use(serve('./client/dist'));
}

// create server
app.listen(config.app.port, () => {
  console.log('The server is running at http://localhost:' + config.app.port);
});

export default app;
