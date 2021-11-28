const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Comment Model
class Comment extends Model {};

// define table columns and configuration
Comment.init(
    {
        // TABLE COLUMN DEFINITIONS GO HERE
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'post',
          key: 'id'
        }
      }
    },
    {
        // pass in our imported sequelize connection (the direct connection to our database)
      sequelize,
        // don't pluralize name of database table
      freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
      underscored: true,
        // make it so our model name stays lowercase in the database
      modelName: 'comment'
    }
);

module.exports = Comment;