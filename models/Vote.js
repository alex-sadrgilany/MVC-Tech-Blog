const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Vote Model
class Vote extends Model {};

Vote.init(
    {
        // define Vote columns here
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        // pass in our imported sequelize connection
      sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
      timestamps: false,
        // don't pluralize name of database table
      freezeTableName: true,
        // use underscore for column names (i.e. post_id NOT postId)
      underscored: true,
        // make sure model name stays lowercase in the database
      modelName: 'vote'
    }
);

module.exports = Vote;