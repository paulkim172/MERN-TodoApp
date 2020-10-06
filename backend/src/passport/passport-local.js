const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const {User} = require('../mongoose/mongooseCRUD');

const addPassportLocal = passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username:username}, function (err,user) {
            if(err) {return done(err);}
            if(!user) {return done(null, false);}
            if (!user.verifyPassword(password)) {return done(null, false);}
            return done(null, user);
        })
    }
))

exports.addPassportLocal = addPassportLocal;