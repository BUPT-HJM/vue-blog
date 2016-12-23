// test router
export default (router) => {
    router.get('/123', ctx => {
        // console.log(this);
        // ctx.type="text/plain;charset=utf-8";
        ctx.body = { a: 123 };
        // ctx.status = 200;
        // ctx.state = {
        //     title: 'aaa'
        // };

        //ctx.throw(500,123)
        console.log(ctx.res);
        // console.log(ctx.req);

        // console.log(ctx);
        // console.log('123!');
    });
}
