"use strict";
import privateConfig from './private.js'
let config = {
    app: {
        port: process.env.PORT || 8888,
        baseApi: '/api'
    },
    mongodb: {
        url: 'mongodb://localhost:27017/vue-blog'
    }
}
console.log(privateConfig)
config = Object.assign(config, privateConfig)
console.log(config);
export default config;
