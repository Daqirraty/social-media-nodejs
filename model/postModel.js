const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Post = sequelize.define('posts',{
  sn:{
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  post_id:{
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  user_id:{
    type: DataTypes.STRING,
    allowNull: false
  },
  post:{
    type: DataTypes.TEXT,
    allowNull: false
  }
});


module.exports = Post;

