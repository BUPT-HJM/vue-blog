function historyApiFallback (options) {
  const expressMiddleware = require('connect-history-api-fallback')(options)
  const url = require('url')
  return (ctx, next) => {
  	let parseUrl = url.parse(ctx.req.url)
    // 添加path match，让不匹配的路由可以直接穿过中间件
  	if(!parseUrl.pathname.match(options.path)) {
  		return next()
  	}
    // 修改content-type
    ctx.type = 'html'
    return expressMiddleware(ctx.req, ctx.res, next)
  }
}

module.exports = historyApiFallback
