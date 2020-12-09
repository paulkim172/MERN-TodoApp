const bcrypt = require('bcrypt');

const saltAndHashNewPassword = (user) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err,salt) => {    
      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err) throw err;
        user.password = hash;
        // console.log(user.password + ' from saltAndHash');
        resolve(user);
      })
    })
  })
     
}

const checkHashedPassword = (passwordEntry,user) => {
  return bcrypt.compareSync(passwordEntry, user.password);
}



exports.saltAndHashNewPassword = saltAndHashNewPassword;
exports.checkHashedPassword = checkHashedPassword;