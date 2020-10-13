const express = require('express');
const passport = require('passport');
const {addPassportLocal} = require('./passport/passport-local');
const {createNewUser} = require('../../database/mongooseCRUD');
const {auth} = require('./session');

const app = express()

const login = () => {

  addPassportLocal();
  
  //Register

    app.post('/register', function (req,res) {
      createNewUser(
        null,
        req.body.username,
        req.body.password,
        req.body.email,
        req.body.subscribe
        );
      res.redirect('/login');
    })
  
  //Login
  
  app.post('/login',
    passport.authenticate('local', {failureRedirect: '/login'}),
    function(req,res){
      if (req.body.remember) {
        req.session.cookie.expires = false;
      }
      res.redirect('/');
    })
  
  //Logout
  
  app.delete('/session', function (req, res) {
    req.session.destroy();
    res.send('logged out.')
  })
  
  //Check if Logged In before showing content example
  
  app.get('/content', auth, function(req, res) {
    res.send('you are still logged in.')
  })
}

exports.login = login;