const chalk = require('chalk');
const express = require('express');
const { route } = require('express/lib/application');
const { default: slugify } = require('slugify');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');

router.get('/articles', (req,res)=>{
    res.send("test");
});

router.get('/admin/articles/new', (req,res)=>{
    
    Article.findAll({
        include: [{
            model: Category
        }]
    }).then(articles=>{
        Category.findAll().then(categories=>{
            res.render('articles/newarticle', {
                categories: categories,
                articles: articles
            });
        }).catch(err=>{
            console.log(chalk.red(err));
            res.render('articles/newarticle', {
                articles: articles
            });
        })
    }).catch(err=>{
        console.log(chalk.red(err));
    });
});

router.post('/admin/articles/save', (req,res)=>{
    let title = req.body.title;
    let article = req.body.body;
    let catId = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: article,
        categoryId: catId
    }).then(()=>{
        res.redirect('/admin/articles/new');
    }).catch(err=>{
        console.log(chalk.red(err));
    });
});

router.post('/admin/articles/delete', (req,res)=>{
    let id = req.body.id;

    if (id != undefined && !isNaN(id)) {
        Article.destroy({
            where: {
                id: id
            }
        }).then(()=>{
            res.redirect('/admin/articles/new')
        }).catch(err=>{
            console.log(chalk.red(err));
        });
    }else{
        res.redirect('/admin/articles/new')
    }
});

module.exports = router;