var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello!')
});

app.use(express.static(__dirname + '/public'));

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080

app.listen(port, ip)