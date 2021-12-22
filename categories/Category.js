const Sequelize = require('sequelize');
const connection = require('../database/dbconfig');
const chalk = require('chalk');

const Category = connection.define('categories',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Category.sync({force: false}).then(()=>{
    console.log(chalk.green("Table categories created successfully"));
}).then(err=>{
    console.log(chalk.red(err));
})

module.exports = Category;