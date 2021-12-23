const chalk = require('chalk');
const express = require('express');
const slugify = require('slugify');
const Category = require('./Category');
const router = express.Router();

router.get('/admin/categories/new', (req,res)=>{
    res.render('categories/newcategory.ejs');
});

router.post('/admin/categories/save', (req,res)=>{
    let title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect('/category/admin/categories/new')
        }).catch(err=>{
            console.log(chalk.red(err));
        });
    }else{
        res.redirect('/admin/categories/new');
    }
});

module.exports = router;