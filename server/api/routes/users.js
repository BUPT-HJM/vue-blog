// var express = require('express');
// var router = express.Router();

// var $ = require('../controllers/users_controller');


// -- custom


/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /users[/]        => user.list()
 *  GET    /users/new       => user.new()
 *  GET    /users/:id       => user.show()
 *  GET    /users/:id/edit  => user.edit()
 *  POST   /users[/]        => user.create()
 *  PATCH  /users/:id       => user.update()
 *  DELETE /users/:id       => user.destroy()
 *
 */

// router.get('/new', $.new);
// router.get('/:id/edit', $.edit);

// router.route('/')
//   .get($.list)
//   .post($.create);

// router.route('/:id')
//   .patch($.update)
//   .get($.show)
//   .delete($.destroy);


// module.exports = router;
export default (router) => {
    router.get('/567', ctx => {
        ctx.body = '567';
        console.log('567!');
    });
}
