"use strict";
/**
 * dependencies
 */
const koa = require('koa');
const config = require('./configs');
const app = new koa();

/**
 * test/study koa middleware
 */
app.use(async(ctx, next) => {
    console.log('middleware1 start');  // 1
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);  // 4
    console.log('middleware1 end');  // 5
});
app.use(async(ctx, next) => {
    console.log('middleware2 start');  // 2
    await next();
    console.log('middleware2 end');  // 3
});


/**
 * create server
 */
app.listen(config.app.port, () => {
    console.log('The server is running at http://localhost:' + config.app.port);
});

module.exports = app;
