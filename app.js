// setup
var express = require('express');
var app = express();

var db = require('mongoose')
db.connect("mongodb://localhost:27017/node-blog")

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// routes
require('./routes')(app, db);

// listen
app.listen(3000, () => {
    console.log('started');
})


