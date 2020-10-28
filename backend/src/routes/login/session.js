const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const secret = require('../../secrets/session-secrets');

//Authentication and Authorization Middleware
  
exports.auth = (req, res, next) => {
  if (req.session && req.session.user){
    return next();
  } else {
    return res.sendStatus(401);
  }
}

//Session

exports.session = (app) => {
    if(app.get('env') === 'production') {
        app.set('trust proxy', 1);
      }
      
    app.use(session({
        secret: secret,
        resave: true,
        saveUninitialized: true,
        user: 'x',
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            dbName: 'sessions',
            autoRemove: 'disabled'
        }),

        cookie: {
          secure: true,
          expires: true,
          maxAge: 1000 * 60 * 60 * 12 * 14
        }
      }))
}

