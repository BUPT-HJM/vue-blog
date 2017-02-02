import Article from '../../models/article.js'
import md5 from "md5";
import jwt from 'jsonwebtoken'
import config from '../../configs/'
import verify from '../../middleware/verify.js'




// function async createToken(ctx) {
//  console.log(this);
// }
//
async function createArticle(ctx) {
  const title = ctx.request.body.title;
  const content = ctx.request.body.content;
  const abstract = ctx.request.body.abstract;
  const publish = ctx.request.body.publish;
  const createTime = new Date();
  const lastEditTime = new Date();
  if (title == '') {
    ctx.throw(400, '标题不能为空')
  }
  if (content == '') {
    ctx.throw(400, '文章内容不能为空')
  }
  if (abstract == '') {
    ctx.throw(400, '摘要不能为空')
  }
  const article = new Article({
    title,
    content,
    abstract,
    publish,
    createTime,
    lastEditTime
  });
  const createResult = await article.save().catch(err => {
    console.log(err);
    ctx.throw('500', '服务器内部错误')
  });
  console.log('文章创建成功');
  ctx.body = {
    success: true,
    id: createResult._id
  }
}

export default async(router) => {
  router.post('/articles', verify, createArticle)
}
