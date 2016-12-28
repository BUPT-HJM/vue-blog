"use strict";

import koa from 'koa';
import convert from 'koa-convert';
import onerror from 'koa-onerror';
import mongoose from 'mongoose';
import config from './configs';
import middleware from './middleware'
import api from "./api";
const app = new koa();

// connect mongodb
mongoose.connect(config.mongodb.url);
mongoose.connection.on('error', console.error);

// middleware
app.use(middleware());
onerror(app);

// api/router
app.use(api());

// create server
app.listen(config.app.port, () => {
    console.log('The server is running at http://localhost:' + config.app.port);
});

export default app;



