'use strict'


const devMiddleware = require('webpack-dev-middleware')

module.exports = (compiler, opts) => {
  const expressMiddleware = devMiddleware(compiler, opts)
  function a(ctx, next) {
    return expressMiddleware(ctx.req, {
      end: (content) => {
        ctx.body = content
      },
      setHeader: (name, value) => {
        ctx.headers[name] = value
      }
    },next)
    
    // return next();
  }
  a.fileSystem = expressMiddleware.fileSystem
  return a;
}