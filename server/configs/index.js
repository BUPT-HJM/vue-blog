import fs from 'fs'
let config = {
  app: {
    port: process.env.PORT || 8889,
    baseApi: '/api'
  },
  mongodb: {
    url: 'mongodb://localhost:27017/vue-blog'
  },
  jwt: {
    secret: 'me' //默认
  },
  mongodbSecret: {
    user: '',
    pwd: ''
  },
}
if (fs.existsSync(__dirname + '/private.js')) {
  config = Object.assign(config, require('./private.js'));
}
console.log(config);
export default config;
