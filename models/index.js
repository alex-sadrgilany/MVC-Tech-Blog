const User = require("./User");
const Post = require("./Post");
const Vote = require("./Vote");
const Comment = require("./Comment");

// defining all relationships between models

// a user can create many different posts
User.hasMany(Post, {
    foreignKey: "user_id"
});

// a post can only belong to one single user
Post.belongsTo(User, {
    foreignKey: "user_id"
});

// a user can vote on many different posts
User.belongsToMany(Post, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "user_id"
});

// a post can be voted on by many different users
Post.belongsToMany(User, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "post_id"
});

// a single vote belongs to one user
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

// a particular vote belongs to one post
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

// a user can have many different votes on various posts
User.hasMany(Vote, {
    foreignKey: 'user_id'
});

// a post can have many different votes from various users
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

// a particular comment belongs to one single user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// a particular comment belongs to one single post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// a user can create many different comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// a post can have many different comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment };