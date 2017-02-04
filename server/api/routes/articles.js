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
    ctx.throw(500, '服务器内部错误')
  });
  console.log('文章创建成功');
  ctx.body = {
    success: true,
    article: createResult
  }
}

async function getAllArticles(ctx) {
  const articleArr = await Article.find().catch(err => {
    ctx.throw(500, '服务器内部错误')
  });
  ctx.body = {
    success: true,
    articleArr
  }
}

async function modifyArticle(ctx) {
  const id = ctx.params.id;
  const title = ctx.request.body.title;
  const content = ctx.request.body.content;
  const abstract = ctx.request.body.abstract;
  if (title == '') {
    ctx.throw(400, '标题不能为空')
  }
  if (content == '') {
    ctx.throw(400, '文章内容不能为空')
  }
  if (abstract == '') {
    ctx.throw(400, '摘要不能为空')
  }
  const article = await Article.findByIdAndUpdate(id, { $set: ctx.request.body }).catch(err => {
    if (err.name === 'CastError') {
      this.throw(400, 'id不存在');
    } else {
      this.throw(500, '服务器内部错误')
    }
  });
  ctx.body = {
    success: true
  }
}

async function deleteArticle(ctx) {
  const id = ctx.params.id;
  const article = await Article.findByIdAndRemove(id).catch(err => {
    if (err.name === 'CastError') {
      this.throw(400, 'id不存在');
    } else {
      this.throw(500, '服务器内部错误')
    }
  });
  ctx.body = {
    success: true
  }
}

// async function publishArticle(ctx) {
//   const id = ctx.params.id;
//   const article = await Article.findByIdAndUpdate(id, { $set: { publish: true } }).catch(err => {
//     if (err.name === 'CastError') {
//       this.throw(400, 'id不存在');
//     } else {
//       this.throw(500, '服务器内部错误')
//     }
//   });
//   ctx.body = {
//     success: true
//   }
// }

// async function notPublishArticle(ctx) {
//   const id = ctx.params.id;
//   const article = await Article.findByIdAndUpdate(id, { $set: { publish: false } }).catch(err => {
//     if (err.name === 'CastError') {
//       this.throw(400, 'id不存在');
//     } else {
//       this.throw(500, '服务器内部错误')
//     }
//   });
//   ctx.body = {
//     success: true
//   }
// }



export default async(router) => {
  router.post('/articles', verify, createArticle)
    .get('/articles', getAllArticles)
    .patch('/articles/:id', verify, modifyArticle)
    .delete('/articles/:id', verify, deleteArticle)
}
