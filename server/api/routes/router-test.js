// test router
import verify from '../../middleware/verify.js'
export default (router) => {
    router.post('/123', verify, ctx => {
        // console.log(this);
        // ctx.type="text/plain;charset=utf-8";
        ctx.body = { success: true };
        // ctx.status = 200;
        // ctx.state = {
        //     title: 'aaa'
        // };

        //ctx.throw(500,123)
        //console.log(ctx.res);
        // console.log(ctx.req);

        // console.log(ctx);
        // console.log('123!');
    });
}
