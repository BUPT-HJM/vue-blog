import * as $ from '../../controllers/articles_controller.js'
import verify from '../../middleware/verify.js'


export default async(router) => {
  router.post('/articles', verify, $.createArticle)
    .get('/articles', $.getAllArticles)
    .patch('/articles/:id', verify, $.modifyArticle)
    .delete('/articles/:id', verify, $.deleteArticle)
}
