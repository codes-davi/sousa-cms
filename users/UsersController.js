const chalk = require('chalk');
const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');

router.get('/admin/users', (req,res)=>{

    User.findAll({
        order:[['id','DESC']]
    }).then(users=>{
        res.render('users/users', {
            users:users
        });
    }).catch(err=>{
        console.log(chalk.red(err));
    });
});

router.post('/admin/users/create', (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);


    User.findOne({where:{
        email: email
    }}).then(user=>{
        if(user==undefined){
            User.create({
                email: email,
                password: hash
            }).then(()=>{
                res.redirect('/');
            }).catch(err=>{
                console.log(chalk.red(err));
            });
        }else{
            res.redirect('/admin/users');
        }
    });
});

router.get('/login', (req,res)=>{
    res.render('users/login', {
        showCategory: false
    });
});

router.post('/authenticate', (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
        where:{
            email: email
        }
    }).then((user)=>{
        if (user!= undefined) {

            let correct = bcrypt.compareSync(password, user.password);
            
            if (correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin/articles/new')
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    }).catch(err=>{
        console.log(chalk.red(err));
    })

});

module.exports = router;