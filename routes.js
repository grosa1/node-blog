module.exports = function(app, db) {

    var sha256 = require('js-sha256');
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
        let ts = Date.now();
        req.body.date = new Date(ts).getDate() + "/" + new Date(ts).getMonth()+1 + "/" + new Date(ts).getFullYear();
        
        var postData = new Post(req.body);
        postData.save().then( result => {
            res.redirect('/');
        }).catch(err => {
            res.status(400).send("Unable to save data");
        });
    });

    app.get("/login", (req, res) => {
        res.render('login');
    });

    app.post("/submit-post", (req, res) => {
        let user = sha256(req.body.user);
        let pw = sha256(req.body.pw);

        if(user === '192c33caac3d89ed647f6dc54419161c2bbf4b57d12bb8c546e41d6448597571' && pw === 'aa6a9b4b8d6f582d9f2856593bd6c00f5f5cbd980f99e00c41b0b5fc7726a750') {
            res.render('new-post-page');
        } else {
            res.redirect('/');
        }
    });
}