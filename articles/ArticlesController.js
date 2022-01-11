const chalk = require('chalk');
const express = require('express');
const { route } = require('express/lib/application');
const { default: slugify } = require('slugify');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const adminAuth = require('../handlers/admin-handler');

router.get('/admin/articles/new', adminAuth, (req,res)=>{
    
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

router.post('/admin/articles/save', adminAuth, (req,res)=>{
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

router.post('/admin/articles/delete', adminAuth, (req,res)=>{
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

router.get('/admin/articles/edit/:id', adminAuth, (req,res)=>{
    let id = req.params.id;
    
    if (id != undefined) {
        Article.findByPk(id).then(article=>{
            Category.findAll().then(categories=>{
                res.render('articles/editarticle', {
                    article: article,
                    categories: categories
                });
            })
        }).catch(err=>{
            console.log(chalk.red(err));
        });
    } else {
        res.redirect('/admin/articles/new');
    }
});

router.post('/admin/articles/update/:id', adminAuth, (req, res) => {
    let id = req.params.id;
    let title = req.body.title;
    let body = req.body.title;
    let categoryId = req.body.category;
    Article.update({
        title: title,
        body: body,
        categoryId: categoryId
    },
        {
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/admin/articles/new');
        }).catch(err => {
            console.log(chalk.red(err));
        });
});

router.get('/articles/page/:num', adminAuth, (req,res)=>{
    let page = parseInt(req.params.num);
    let offset;
    let next;

    if (isNaN(page) || page == 1) {
        offset = 0;
    } else {
        offset = (page-1) * 4;
    }

    Article.findAndCountAll({
        limit:4,
        offset: offset
    }).then(articles=>{
        if (offset + 4 >= articles.count ) {
            next = false;
        } else {
            next = true
        }
        Category.findAll({
            order:[['id', 'DESC']]
        }).then(categories=>{
            res.render('articles/page', {
                articles: articles,
                categories: categories,
                page: page,
                hasNext:next
            });
        }).catch(err=>{
            console.log(chalk.red(err));
        });
    });
});

module.exports = router;