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
        email: user.email,
        id: user._id,
    }
    console.log(payload);
    let token = jwt.sign(payload,
        refreshSecret,
        { 
            expiresIn: '28d'
        });
    console.log(token +' refresh token');
    return token;
};

exports.assignJWTToDevice = (user, deviceId, JWTRefreshToken) => {
    if(!user.devices.some(obj => obj['deviceId'] === deviceId)){
        if(user.devices.length >=3){
            for(let i = 0; i <= user.devices.length - 3; i++){
                user.devices.shift();
            }
        }
        user.devices.push({
            'deviceId': deviceId,
            'activeToken': JWTRefreshToken
        })
    } else {
        user.devices[user.devices.findIndex(obj => obj['deviceId']  === deviceId)] = {
            'deviceId': deviceId,
            'activeToken': JWTRefreshToken
        }
    }
    return user.devices;
}

exports.checkRefreshJWT = (token, options) => {
    jwt.verify(token, refreshSecret, options, function(err, jwt_payload) {
        if(err) console.log(err);
        console.log(jwt_payload);
        return jwt_payload;
    })
}