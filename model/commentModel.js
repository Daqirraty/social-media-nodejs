const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Comment = sequelize.define('Comments',{
  sn:{
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  comment_id:{
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,

  },
  user_id:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  post_id:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  comment:{
    type: DataTypes.TEXT,
    allowNull: false
  }

});

module.exports = Comment;