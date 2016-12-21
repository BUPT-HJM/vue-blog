"use strict";
let config = {
    app: {
        port: process.env.PORT || 3030
    },
    mongodb: {
        url: 'mongodb://localhost:27017/vue-blog'
    }
}

module.exports = config;
