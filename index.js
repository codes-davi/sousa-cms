const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const connection = require('./database/dbconfig');
const categoriesController = require('./categories/CategoriesController');
const articleController = require('./articles/ArticlesController');
const Category = require('./categories/Category');
const Article = require('./articles/Article');
const app = express();

//setting view engine, bodyparser and static files location
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
//end

connection.authenticate().then(()=>{
    console.log(chalk.blue('Authenticated'));
}).catch(err=>{
    console.log(err);
});

//ROUTES
app.use('/category', categoriesController);
app.use('/article', articleController);

app.get('/', (req,res)=>{
    res.render('index');
});

app.listen(3000, ()=>{
    console.log(chalk.green('RUNNING'));
});