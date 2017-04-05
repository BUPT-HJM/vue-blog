'use strict';

import compose from 'koa-compose';
import Router from 'koa-router';
import convert from 'koa-convert';
import importDir from 'import-dir';
import config from '../configs';
const routes = importDir('./routes');

export default function api() {
  const router = new Router({
    prefix: config.app.baseApi
  });
  Object.keys(routes).forEach(name => {
    // console.log(name)
    return routes[name](router)
  });
  return convert.compose([
    router.routes(),
    router.allowedMethods(),
  ]);
}
