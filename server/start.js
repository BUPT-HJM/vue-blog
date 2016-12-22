require("babel-core/register")({
     presets: ['es2015', 'stage-0']
});
require("babel-polyfill");

module.exports = require('./index.js');


