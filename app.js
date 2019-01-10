// Setup
var express = require('express');
var JsonDB = require('node-json-db');
var bodyParser = require('body-parser');

//setup
var app = express();

var db = new JsonDB("blog", true, false);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// routes
app.get("/", (req, res) => {
    let posts = db.getData('/');
    console.log(posts);
    res.render('index', { posts: posts})
});

app.post('/addpost', (req, res) => {
    var postData = req.body;

    db.push('/', postData).then( result => {
        res.redirect('/');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});

// Listen
app.listen(3000, () => {
    console.log('Server listing on 3000');
})


