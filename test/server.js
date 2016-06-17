var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
  return next();
});

app.use(express.static('.', {
  extensions: ['html']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/active', function (req, res) {
  res.send('active');
});

app.all('/plain', function (req, res) {
  res.send(req.method);
});

app.all('/json', function (req, res) {
  console.log(req.method, req.body);
  res.json({
    method: req.method,
    body: req.body || ''
  });
});

app.listen(3000, function () {
  console.log('Listening on localhost:3000');
});
