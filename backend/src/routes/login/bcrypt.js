const bcrypt = require('bcrypt');

const saltAndHashNewPassword = (user) => {
    bcrypt.genSalt(10, (err,salt) => {
        
        bcrypt.hash(user.password, salt, (err, hash) => {
          if(err) throw err;
          user.password = hash;
          user.save(function (err) {
            if(err) return handleError(err);
          })
        })
    })
}

const checkHashedPassword = (passwordEntry,user) => {
    bcrypt.compare(passwordEntry,user.password, function(err, res){
      if(err) throw err;
        return res;
    })
 }


exports.saltAndHashNewPassword = saltAndHashNewPassword;
exports.checkHashedPassword = checkHashedPassword;