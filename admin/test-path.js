var path = require('path');

console.log(__dirname);
console.log(__filename);
console.log(process.cwd()); // 与运行脚本目录有关
console.log(path.resolve('./')); // 与运行脚本目录有关


console.log(path.resolve(__dirname, '../lib/common.js'));
