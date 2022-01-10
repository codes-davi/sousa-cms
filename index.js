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
app.use(categoriesController);
app.use(articleController);

app.get('/', (req,res)=>{
    Article.findAndCountAll({
        order: [['id', 'DESC']],
        limit: 4,
    }).then(articles=>{
        Category.findAll().then(categories=>{
            res.render('index', {
                articles: articles,
                categories: categories,
                page: 1,
                hasNext: true
            });
        }).catch(err=>{
            console.log(chalk.red(err));
        })
    }).catch(err=>{
        console.log(chalk.red(err));
    });
});

app.get('/posts/:slug', (req,res)=>{
    
    let slug = req.params.slug;
    
    if(slug) {
        Article.findOne({
            where:{
                slug: slug
            }
        }).then(article=>{
            Category.findAll({
                order: [['id', 'DESC']]
            }).then(categories=>{
                res.render('post',{
                    article: article,
                    categories: categories
                })
            }).catch(err=>{
                console.log(chalk.red(err));
                res.redirect('/');
            })
        }).catch(err=>{
            console.log(chalk.red(err));
        });
    } else {
        res.redirect('/');
    }
});

app.listen(3000, ()=>{
    console.log(chalk.green('RUNNING'));
});