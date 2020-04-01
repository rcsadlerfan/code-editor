const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

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

app.get('/', (req, res) => {
    res.send("Code Editor lel");
});

app.listen(3000);