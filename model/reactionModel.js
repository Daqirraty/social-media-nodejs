const { DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Reaction = sequelize.define('reactions', {
  sn:{
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  reaction_id:{
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  user_id:{
    type: DataTypes.STRING,
    allowNull: false,
  },                                                                                                        
  post_id:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  reaction:{
    type: DataTypes.ENUM,
    allowNull: true,
    values: ["like", "dislike", "love", "funny"],
    defaultValue: "like"
  }

});


module.exports = Reaction;