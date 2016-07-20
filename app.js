var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('.'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/tests.html');
});

app.get('/active', (req, res) => res.send('active'));

app.all('/plain', (req, res) => res.send(req.method));

app.all('/json', (req, res) => res.json({ method: req.method, body: req.body }));

app.get('/:url', (req, res) =>
  res.sendFile(__dirname + '/' + req.params.url.replace('.html', '') + '.html')
);

app.listen(3000, function () {
  console.log('Open your browser on http://localhost:3000/tests for testing Umbrella');
});
