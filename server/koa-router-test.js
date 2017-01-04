const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const json = require('koa-json');


const app = new Koa();
app.use(convert.compose([
    bodyParser(),
    json(),
    logger()
]));
const router = new Router();
router.get('/', (ctx, next) => {
    ctx.body = { a: 1 };
    console.log(ctx);
});
app.use(convert(router.routes()));
app.use(convert(router.allowedMethods()));


// create server
app.listen(3001, () => {
    console.log('The server is running at http://localhost:' + 3001);
});

