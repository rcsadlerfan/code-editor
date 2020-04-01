const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const sess = {
    secret: 'TEMPSECRETKEY',
    resave: false,
    saveUninitialized: false
};

mongoose.connect("mongodb://localhost/editor", {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session(sess));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function isLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.redirect('/auth/login');
    }
}

app.use('/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {user: req.user});
});

app.listen(3000);