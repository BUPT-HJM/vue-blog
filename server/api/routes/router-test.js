// test router
export default (router) => {
    router.get('/123', ctx => {
        ctx.body = '123';
        console.log('123!');
    });
}

