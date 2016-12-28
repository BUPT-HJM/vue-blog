var jwt = require('jsonwebtoken');

var token = jwt.sign({
    username: 'it is a test',
    password: 'heiheihei'
}, 'secret', { expiresIn: '1h' });


var decoded = jwt.verify(token, 'secret');


console.log(token);
console.log(decoded.username)
console.log(decoded.password)
