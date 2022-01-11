const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const connection = require('./database/dbconfig');
const categoriesController = require('./categories/CategoriesController');
const articleController = require('./articles/ArticlesController');
const userController = require('./users/UsersController');
const Category = require('./categories/Category');
const Article = require('./articles/Article');
const app = express();

//setting view engine, bodyparser and static files location
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
//end

//express-session
app.use(session({
    secret: 'ds7&&Ds8',
    cookie: {maxAge: 86400000}
}));

//database auth
connection.authenticate().then(()=>{
    console.log(chalk.blue('Authenticated'));
}).catch(err=>{
    console.log(err);
});

//ROUTES
app.use(categoriesController);
app.use(articleController);
app.use(userController);

app.get('/', (req,res)=>{
    let next;
    Article.findAndCountAll({
        order: [['id', 'DESC']],
        limit: 4,
    }).then(articles=>{

        if (4 >= articles.count ) {
            next = false;
        } else {
            next = true
        }

        Category.findAll().then(categories=>{
            res.render('index', {
                articles: articles,
                categories: categories,
                page: 1,
                hasNext: next,
                showCategory: true
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