const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);


// route handling all articles

app.route("/articles")
// get all articles
.get(function (req, res) {
    Article.find({},function (err, foundArticles) {
        if (!err) res.send(foundArticles);
        else res.send(err);
    });
})
// add new article
.post(function (req, res) {
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function (err) {
        if (!err) res.send("Successfully added a new article");
        else res.send(err);
    });    
})
// delete all articles
.delete(function (req, res) {
    Article.deleteMany({},function (err) {
        if (!err) res.send("Successfully deleted all components");
        else res.send(err);
    });
});

// -----------------------------
// route handling specific article

app.route("/articles/:articleTitle")
// get specific article
.get(function (req, res) {
    Article.findOne({title:req.params.articleTitle},function (err, foundArticle) {
        if (!err) {
            if (foundArticle) res.send(foundArticle);
            else res.send("Sorry but nothing was found to match your request");
        }
        else {res.send(err);}
    })
})
// replace specific article
.put(function (req, res) {
    Article.update(
        {title:req.params.articleTitle},
        {title:req.body.title, content:req.body.content},
        {overwrite: true},
        function (err) {
        if (!err) res.send("Successfully Updated the article");
        else res.send(err);
    });
})
// update specific article
.patch(function (req, res) {
    Article.update(
        {title:req.params.articleTitle},
        {$set: req.body},
        function (err) {
            if(!err) res.send("Successfully patched the article");
            else res.send(err);
        });
})
// delete specific article
.delete(function (req, res) {
    Article.deleteOne(
        {title:req.params.articleTitle},
        function (err) {
            if (!err) res.send("Deleted this article successfully");
            else res.send(err);
        });
});




app.listen(3000,function () {
    console.log("Server started successfully");
})
