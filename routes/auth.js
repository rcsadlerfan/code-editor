const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/auth/login'
}), (req, res) => {});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    User.register({username: req.body.username}, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect('/auth/register');
        } else {
            res.redirect('/profile');
        }
    });
});

router.get('/logout', (req, res) => {
    req.logout();
});

module.exports = router;