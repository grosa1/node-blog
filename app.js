// Setup
var express = require('express');
var bodyParser = require('body-parser');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

//setup
var app = express();

const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ posts: []}).write()

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// routes
app.get("/", (req, res) => {
    let posts = db.get('posts').value();
    res.render('index', { posts: posts})
});

app.post('/addPost', (req, res) => {
    console.log(req.body);
    let postTitle = req.body.title;
    let postBody = req.body.body;
    //timestamp mills
    let postDate = Date.now();

    db.get('posts')
        .push({ date: postDate, title: postTitle, body: postBody})
        .write()

    res.redirect('/');
});

// Listen
app.listen(3000, () => {
    console.log('Server listing on 3000');
})


