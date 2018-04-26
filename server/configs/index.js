import fs from 'fs';
let config = {
    app: {
        port: process.env.PORT || 8889,
        baseApi: '/api',
    },
    mongodb: {
        url: process.env.MONGO_URL || 'mongodb://localhost:27017/vue-blog',
    },
    jwt: {
        secret: 'me', // 默认
    },
    mongodbSecret: { // mongodb用户和密码
        user: '',
        pass: '',
    },
    admin: { // 后台初始化的用户名密码
        user: 'admin',
        pwd: 'password',
    },
    disqus: { // disqus
        url: '',
    },
    baidu: { // 百度统计
        url: '',
    },
};

// 可在private.js定义自己私有的配置
// module.exports = {
//   mongodbSecret: {
//      user: '',
//      pass: ''
//   },
//   jwt: {
//      secret: 'xxx'
//   },
//   admin: {
//      user: '',
//      pwd: ''
//   }
// }
if (fs.existsSync(__dirname + '/private.js')) {
    config = Object.assign(config, require('./private.js'));
}
console.log(config);
export default config;
