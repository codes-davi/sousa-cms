const Sequelize = require('sequelize');
const connection = require('../database/dbconfig');
const chalk = require('chalk');

const User = connection.define('users',{
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

// User.sync({force: false});

module.exports = User;