var express = require('express');
var path = require('path');
var app = express();

// serve pure static assets
var staticPath = path.posix.join('/', '/static');
app.use(staticPath, express.static('./static'));
app.use('/sw.js', express.static('./sw.js'));

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);
