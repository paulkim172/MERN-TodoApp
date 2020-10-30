const express = require('express');
const passport = require('passport');
const {addPassportLocal} = require('../../services/passport/passport-local');
const {createNewUser} = require('../../database/mongooseCRUD');
const {auth} = require('./session');

const {User} = require('../../database/mongooseModels')

exports.login = (app) => {

  addPassportLocal();
  
  //Register

  app.post('/register', (req,res) => {
    createNewUser(req,res);
    res.send('created User');
    }
  )
  
  //Login
  
  app.post('/login',
    passport.authenticate('local', {failureRedirect: '/login'}),
    function(req,res){
      console.log('login info received! from Login.js');
      console.log(req.body);
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

  app.post('/test', function (req,res) {
    console.log('test complete!');
  })

    //TEST
// app.post('/hello', function (req,res) {
//   User.create({}, function(err,username){
//     if (err) return handleError(err);
//   })
//   res.send('done!')
// })
  
}

