const router = require('express').Router();
const { Post, User, Vote, Comment } = require('../../models');
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");


// get all posts
router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            "id", 
            "post_url", 
            "title", 
            "created_at",
            [
                sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 
                'vote_count'
            ]
        ],
        // order by most votes first
        order: [["vote_count", "DESC"]],
        include: [
            {
                // include all comments on each post
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    // include the user's that made those comments
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
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get one single post by id
router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id", 
            "post_url", 
            "title", 
            "created_at",
            [
                sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 
                'vote_count'
            ]
        ],
        include: [
            {
                // include all comments on the post
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    // include the users that made each comment
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                // include the user that made the post
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
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// creates a single post only if a user is logged in
router.post("/", withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// add a vote to a post only if a user is logged in using the upvote method we created in the Post model
router.put("/upvote", withAuth, (req, res) => {
    if (req.session) {
        Post.upvote({...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

// update a single post's title by id only if a user is logged in
router.put("/:id", withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: "No post found with this id." });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete a single post by id
router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: "No post found with this id." });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;