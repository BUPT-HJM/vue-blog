'use strict';

import logger from 'koa-logger';
import bodyParser from 'koa-bodyParser';
import convert from 'koa-convert';
import onerror from 'koa-onerror';

export default function middleware() {
    return convert.compose(
        logger(),
        bodyParser(),
    )
}
