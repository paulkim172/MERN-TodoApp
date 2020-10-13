const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const {checkHashedPassword} = require('../bcrypt');
const {User} = require('../../../database/mongooseCRUD');
const {newSession} = require('../session')

const addPassportLocal = () => {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({username:username}, function (err,user) {
                if(err) {return done(err);}
                if(!user) {return done(null, false);}
                if (!checkHashedPassword(password,user)) {return done(null, false);}

                newSession(User.findById);
                
                return done(null, user);
            })
        }
    ))
}    

exports.addPassportLocal = addPassportLocal;