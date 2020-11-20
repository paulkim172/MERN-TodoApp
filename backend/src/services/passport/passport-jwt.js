
const { refreshSecret, secret } = require('../../secrets/token-secrets');

const passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

exports.addPassportAccessJWT = () => {
    options = {
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : secret,
    }

    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}

exports.addPassportRefreshJWT = () => {
    options = {
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : refreshSecret,
    }

    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (!user) {
                return done(null, false);
               
            }  
            if (!checkWhitelist(user.refreshTokens)){
                return done(null, false);
            }
                return done(null, user);
                // or you could create a new account
        });
    }));
}
