const Sequelize = require('sequelize');
const connection = require('../database/dbconfig');
const chalk = require('chalk');

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Article.sync({force: false}).then(()=>{
    console.log(chalk.green('Table articles created successfully'));
}).catch(err=>{
    console.log(chalk.red(err));
})

module.exports = Article;