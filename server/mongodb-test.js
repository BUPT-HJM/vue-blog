// 首先引入 mongoose 这个模块
var mongoose = require('mongoose');
// 然后连接对应的数据库：mongodb://localhost/test
// 其中，前面那个 mongodb 是 protocol scheme 的名称；localhost 是 mongod 所在的地址；
// 端口号省略则默认连接 27017；test 是数据库的名称
// mongodb 中不需要建立数据库，当你需要连接的数据库不存在时，会自动创建一个出来。
// 关于 mongodb 的安全性，mongodb 我印象中安全机制很残废，用户名密码那套都做得不好，更
// 别提细致的用户权限控制了。不过不用担心，mongodb 的默认配置只接受来自本机的请求，内网都连不上。
// 当需要在内网中为其他机器提供 mongodb 服务时，或许可以去看看 iptables 相关的东西。
mongoose.connect('mongodb://localhost/test');

// 上面说了，我推荐在同一个 collection 中使用固定的数据形式。
// 在这里，我们创建了一个名为 Cat 的 model，它在数据库中的名字根据传给 mongoose.model 的第一个参数决定，mongoose 会将名词变为复数，在这里，collection 的名字会是 `cats`。
// 这个 model 的定义是，有一个 String 类型的 name，String 数组类型的 friends，Number 类型的 age。
// mongodb 中大多数的数据类型都可以用 js 的原生类型来表示。至于说 String 的长度是多少，Number 的精度是多少。String 的最大限度是 16MB，Number 的整型是 64-bit，浮点数的话，js 中 `0.1 + 0.2` 的结果都是乱来的。。就不指望什么了。。
// 这里可以看到各种示例：http://mongoosejs.com/docs/schematypes.html
var Cat = mongoose.model('Cat', {
  name: String,
  friends: [String],
  age: Number,
});

// new 一个新对象，名叫 kitty
// 接着为 kitty 的属性们赋值
var kitty = new Cat({ name: 'lueluelue', friends: ['tom', 'jerry']});
kitty.age = 3;

// 调用 .save 方法后，mongoose 会去你的 mongodb 中的 test 数据库里，存入一条记录。
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});
