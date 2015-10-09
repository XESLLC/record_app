var express = require('express');
var app = express();
var router = express.Router();
var engines = require('consolidate');

app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', engines.mustache);

app.get('/', function (req, res) {
 res.render('index');
});

  var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
