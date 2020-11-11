const { refreshSecret, secret } = require('../../secrets/session-secrets');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

exports.addPassportAccessJWT = () => {
    options = {
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secret : secret,
    }

    passport.use('access-jwt',new JwtStrategy(options, function(jwt_payload, done) {
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
        secret : refreshSecret,
    }

    passport.use('refresh-jwt',new JwtStrategy(options, function(jwt_payload, done) {
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
