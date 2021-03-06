const chalk = require('chalk');
const express = require('express');
const slugify = require('slugify');
const Category = require('./Category');
const router = express.Router();
const adminAuth  = require('../handlers/admin-handler');

router.get('/admin/categories/new', adminAuth, (req,res)=>{
 
    Category.findAll({raw:true, order: [['id', 'DESC']]}).then(categories=>{
        res.render('categories/newcategory.ejs', {
            categories: categories
        });
    }).catch(err=>{
        console.log(chalk.red(err));
    });
});

router.post('/admin/categories/save', adminAuth, (req,res)=>{
    let title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect('/admin/categories/new')
        }).catch(err=>{
            console.log(chalk.red(err));
        });
    }else{
        res.redirect('/admin/categories/new');
    }
});

router.post('/admin/categories/delete', adminAuth,  (req,res)=>{
    let id = req.body.id;
    if (id != undefined && !isNaN(id)) {
        Category.destroy({
            where:{
                id:id
            }
        }).then(()=>{
            res.redirect('/admin/categories/new');
        }).catch(err=>{
            console.log(chalk.red(err));
        });
    }else{
        res.redirect('/admin/categories/new');
    }
});

router.post('/admin/categories/update/:id', adminAuth, (req,res)=>{
    let id = req.params.id;
    let title = req.body.title;
    Category.update({
        title: title,
        slug: slugify(title)
    }, {
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect('/admin/categories/new');
    }).catch(err=>{
        console.log(chalk.red(err));
    });
});

module.exports = router;