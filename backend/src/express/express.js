const express = require('express');
const passport = require('passport');
const session = require('express-session');

const app = express()

const {addPassportLocal} = require('../passport/passport-local');
const { createNewUser } = require('../mongoose/mongooseCRUD');

addPassportLocal();

/* ROUTES */
//Session

app.use(cookieSession({
    name: 'session',
    keys: [/* secret keys */],
  
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))

//Login 

app.post('/session',
    passport.authenticate('local', {failureRedirect: '/session'}),
    function(req, res) {
        res.redirect('/');
    })

//Logout

app.delete('/session',
    function(req, res) {
        res.redirect('/');
    })

//Sign Up

app.post('/sign-up',
    function(req, res){
        createNewUser(
            null,
            username,
            password,
            email,
            null,
            'standard',
            level,
            subscription
        );

        res.redirect('/login')
    })