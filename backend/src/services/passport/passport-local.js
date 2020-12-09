const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const {checkHashedPassword} = require('../bcrypt/bcrypt');
const {User} = require('../../database/mongooseCRUD');
const {createJsonWebToken} = require('../jsonwebtoken/jwt')


exports.addPassportLocal = () => {
    passport.use('local', new LocalStrategy({
        usernameField: 'username/email',
    },
        function(usernameOrEmail, password, done) {
            console.log('passport local works')
            console.log(usernameOrEmail, password);
            User.findOne({$or: [
                {email: usernameOrEmail},
                {username: usernameOrEmail}
            ]}, 
            function (err,user) {
                if(err) {
                    return done(err);
                }
                if(!user){
                    console.log('user not found');
                    return done(null, false);
                } else {
                    if(!checkHashedPassword(password,user)) {

                        console.log('wrong password')
                        return done(null, false);
                    }
                    return done(null, user);
                }
            })
        }
    ))
}    
