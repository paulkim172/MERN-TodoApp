const app = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const secret = require('../../secrets/session-secrets');

//Authentication and Authorization Middleware
  
const auth = function(req, res, next) {
  if (req.session && req.session.user){
    return next();
  } else {
    return res.sendStatus(401);
  }
}

//Session

const newSession = async (x) => {
    if(app.get('env') === 'production') {
        app.set('trust proxy', 1);
      }
      
    await app.use(session({
        secret: secret,
        user: x,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            dbName: 'sessions',
            autoRemove: 'disabled'
        }),
        
        resave: false,
        saveUnitialized: true,
        cookie: {
          secure: true,
          expires: true
        }
      }))
}

exports.session = newSession;
exports.auth = auth;