// 'babel-polyfill' is needed for async/await.
import 'babel-polyfill';
import Koa from 'koa';

// Create the app from the ES6 class.
const app = new Koa();

app.use(async (ctx, next) => ctx.body = 'Hello World');

// Start the application.
app.listen(5050, () => console.log('Listening on port 5050.'));

export default app;
