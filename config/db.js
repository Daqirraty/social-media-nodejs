require('dotenv').config();
const mysql2 = require('mysql2');
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize (
                                    process.env.DATABASE_NAME, 
                                    process.env.DATABASE_USERNAME, 
                                    process.env.DATABASE_PASSWORD,
                                    {
                                      host: process.env.DATABASE_HOST,
                                      dialect: process.env.DATABASE_DIALECT,
                                      port: process.env.DATABASE_PORT
                                    }
);

module.exports = sequelize;