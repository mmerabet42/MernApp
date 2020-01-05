const router = require('express').Router();
const verifyToken = require('./verifyToken');
const User = require('../models/User');
const Article = require('../models/Article');
const jwt = require('jsonwebtoken');

// Get all articles
router.get("/get-all", async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch(err) {
        res.status(400).send("Couldn't get all articles");
    }
});

// Get articles of logged user
router.get("/get", verifyToken, async (req, res) => {
    try {
        const articles = await Article.find({ "creator.id": req.user._id });
        res.json(articles);
    } catch(err) {
        res.status(400).send("Couldn't get articles");
    }
});

// Post a new article
router.post("/post", verifyToken, async (req, res) => {
    const article = new Article({
        title: req.body.title,
        body: req.body.body,
        creator: {
            username: req.user.username,
            id: req.user._id
        }
    });
    
    try {
        const newArticle = await article.save();
        res.json({ success: true, data: newArticle });
    } catch(err) {
        res.status(400).json({ success: false, data: "Couldn't post article" });
    }
});

// Delete an article
router.delete("/delete", verifyToken, async (req, res) => {
    const article = await Article.findById(req.body.articleId);
    if (!article)
        return res.status(400).send("Article doesn't exist");
    if (article.creator.id != req.user._id)
        return res.status(400).json({ success: false, data: "Access denied" });
    
    try {
        const result = await Article.deleteOne({ _id: article._id });
        return res.send("Article has been deleted");
    } catch(err) {
        res.send("Article not deleted");
    }
});

module.exports = router;