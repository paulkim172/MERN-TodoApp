const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const {checkHashedPassword} = require('../bcrypt/bcrypt');
const {User} = require('../../database/mongooseCRUD');
const {newSession} = require('../../routes/login/session')

exports.addPassportLocal = () => {
    passport.use('local', new LocalStrategy(
        function(username, password, done) {
            console.log(username, password);
            User.findOne({username:username}, function (err,user) {
                if(err) {
                    return done(err);
                }
                if(!user) {
                    console.log('user not found');
                    return done(null, false);
                }
                if (!checkHashedPassword(password,user)) {
                    console.log('wrong password')
                    return done(null, false);
                }

                newSession(User.findById);
                
                return done(null, user);
            })
        }
    ))
}    
