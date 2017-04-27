import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import onerror from 'koa-onerror';
import compress from 'koa-compress';

export default function middleware() {
  return convert.compose(
    logger(),
    bodyParser(),
    compress({ 
      filter: function(content_type) {
        if (/event-stream/i.test(content_type)) { 
        // 为了让hot reload生效，不对__webpack_hmr压缩
          return false;
        } else {
          return true;
        }
      },
    })
  )
}
