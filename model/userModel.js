const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
  sn:{
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  user_id:{
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  surname:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  othernames:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  username:{
    type: DataTypes.STRING,
    allowNull: false, 
    unique: true
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  occupation:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  about_me:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  password_hash:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password_salt:{
    type: DataTypes.STRING,
    allowNull: false,
  }

});

module.exports = User;

