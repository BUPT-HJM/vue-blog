const moment = require('moment')
moment.locale('zh-cn');
console.log(moment("2017-02-03T01:23:00.000Z").format('lll'))
