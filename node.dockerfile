FROM node:8.9.2

MAINTAINER https://github.com/BUPT-HJM

ENV HOME=/home/app

COPY package.json package-lock.json $HOME/vue-blog/

WORKDIR $HOME/vue-blog
RUN npm install --registry=https://registry.npm.taobao.org

COPY . $HOME/vue-blog
