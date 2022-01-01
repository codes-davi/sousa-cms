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
    Category.findAll().then(categories=>{
        res.render('articles/newarticle', {
            categories: categories
        });
    })
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

module.exports = router;