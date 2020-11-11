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
  return new Promise((resolve, reject) => {
    bcrypt.hash(passwordEntry,10, function(err, hash) { 
      if (err) {throw (err); }
  
      bcrypt.compare(passwordEntry,user.password, function(err, res){
        if(err) throw err;
          return res;
      })
    })
  }) 
}


exports.saltAndHashNewPassword = saltAndHashNewPassword;
exports.checkHashedPassword = checkHashedPassword;