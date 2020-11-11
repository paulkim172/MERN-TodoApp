const {secret, refreshSecret} = require('../../secrets/token-secrets');
const jwt = require('jsonwebtoken');

exports.createAccessJWT = (user) => {
    let payload = {
        username: user.username,
        id: user._id
    }
    console.log(payload);
    let token = jwt.sign(payload,
        secret,
        { 
            expiresIn: '15m'
        });
    console.log(token);
    return token;
};

exports.createRefreshJWT = (user) => {
    let payload = {
        username: user.username,
        password: user.password,
        id: user._id,
    }
    console.log(payload);
    let token = jwt.sign(payload,
        refreshSecret,
        { 
            expiresIn: '28d'
        });
    console.log(token);
    return token;
};
