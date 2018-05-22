const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var mongoose = require('mongoose');
var autoIncrement = require("mongodb-autoincrement");

var User = require('./server/models/user.js');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/users', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

const app = express()
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Accept');
  next()
});
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/list', (req, res) => {
  User.find({}).sort({timestamp: -1}).exec(function(err, products) { res.json(products); });
});

app.get('/:id', function(req, res, next) {
  User.find({id: req.params.id}, function (err, post) {
    res.json(post);
  });
});

app.post('/', function(req, res) {
  User.create(req.body, function (err, post) {
    res.json(post);
  });
});

app.put('/:id', function(req, res, next) {
  User.findOneAndUpdate({id: req.params.id}, req.body, function (err, user) {
    res.json(req.body);
  });
});

app.delete('/:id', function(req, res, next) {
  User.findOneAndRemove({id: req.params.id}, req.body, function (err, post) {
    if (err) console.log(err);
    res.json(post);
  });
});

app.listen(process.env.PORT || 8081);