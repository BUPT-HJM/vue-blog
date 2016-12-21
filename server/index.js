"use strict";
/**
 * dependencies
 */
const koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
//const route = require('koa-route');
//const routes = require('./routes/routes.js');
const mongoose = require('mongoose');
const app = new koa();


/**
 * config
 */
const config = require('./configs');


/**
 * connect db
 */
mongoose.connect(config.mongodb.url);
mongoose.connection.on('error', console.error);


/**
 * middleware
 */
app.use(convert.compose(
  logger(),
  bodyParser()
));

/**
 * test/study koa middleware
 */
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(ctx => {
  ctx.body = 'Hello Koa';
});

/**
 * create server
 */
app.listen(config.app.port, () => {
    console.log('The server is running at http://localhost:' + config.app.port);
});

/**
 * 路由配置
 */
// //获取所有文章
// app.use(route.get('/posts/', routes.posts));
// //新增文章
// app.use(route.post('/post', routes.newpost));
// //获取指定ID文章
// app.use(route.get('/post/:id', routes.post));
// //更新指定ID的文章
// app.use(route.post('/post/:id', routes.updatepost));
// //删除指定ID的文章
// app.use(route.post('/post/:id/del', routes.removepost));

module.exports = app;
