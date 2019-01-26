module.exports = function(app, db) {

    var postSchema = new db.Schema({ date: String, title: String, tag: String, body: String });
    var Post = db.model('Post', postSchema);

    app.get("/", (req, res) => {
        Post.find({}, (err, posts) => {
            res.render('index', { posts: posts})
         });
    });

    app.get("/read-post", (req, res) => {
        let postId = req.query.id
        Post.findById(postId).then(data => {
            console.log(data);
            res.render('read-post-page', data);
        }).catch(err => {
            res.redirect('/');
        });
    });

    app.post('/add-post', (req, res) => {
        let timestamp = Date.now();
        req.body.date = timestamp.toString();
        var postData = new Post(req.body);
        postData.save().then( result => {
            res.redirect('/');
        }).catch(err => {
            res.status(400).send("Unable to save data");
        });
    });

    app.get("/submit-post", (req, res) => {
        res.render('new-post-page');
    });
}