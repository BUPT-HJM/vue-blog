import User from '../../models/user.js'
import md5 from "md5";
import jwt from 'jsonwebtoken'
import config from '../../configs/'




// function async createToken(ctx) {
// 	console.log(this);
// }
//

export default async(router) => {
  let user = await User.find().exec().catch(err => {
    console.log(err);
  })
  console.log(user);
  if (user.length === 0) {
    user = new User({
      name: 'hjm',
      username: 'admin',
      password: md5('password').toUpperCase(),
      avatar: '',
      createTime: new Date()
    })
    await user.save().catch(err => {
      console.log(err);
    });
  }
  router.post('/token', async(ctx) => {
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    // console.log(username)
    // console.log(password)
    let user = await User.findOne({
      username,
    }).exec();
    console.log(user)
    if (user !== null) {
      if (user.password === password) {
        const token = jwt.sign({
          uid: user._id,
          name: user.name,
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 //1 hours
        }, config.jwt.secret);
        //utils.print(token);
        //ctx.status = 200;
        ctx.body = {
          success: true,
          uid: user._id,
          name: user.name,
          token: token
        }
      } else {
        ctx.body = {
          success: false,
          error: '密码错误'
        }
        console.log('密码错误')
          // this.throw(401, '密码错误')
      }
    } else {
      ctx.body = {
        success: false,
        error: '用户名错误'
      }
      console.log('用户名错误')
    }
  });
}
