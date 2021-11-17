const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

// get all posts for the homepage
router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            "id",
            "post_text",
            "title",
            "created_at",
            [sequelize.literal("(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"), "vote_count"]
        ],
        order: [["vote_count", "DESC"]],
        include: [
            {
                // include each posts comments
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    // include the users that made those comments
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                // include the user that made each post
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render("homepage", { 
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get the login route for the homepage
router.get("/login", (req, res) => {
    // redirect users home if they're logged in already
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    // if they're not logged in render the login.handlebars
    res.render("login");
});

// get a single post by id
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id",
            "post_text",
            "title",
            "created_at",
            [sequelize.literal("(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"), "vote_count"]
        ],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                        model: User,
                        attributes: ["username"]
                    }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: "No post found with this id." });
                return;
            }

            const post = dbPostData.get({ plain: true });
            // render the single-post.handlebars on the homepage
            res.render("single-post", { 
                post,
                loggedIn: req.session.loggedIn
             });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;