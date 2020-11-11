const passport = require('passport');
const {addPassportLocal} = require('../../services/passport/passport-local');
const {addPassportJWT, createRefreshJWT} = require('../../services/jsonwebtoken/jwt');
const {createNewUser} = require('../../database/mongooseCRUD');

const { User } = require('../../database/mongooseModels');
const {createAccessJWT,createRefreshJWT} = require('../../services/jsonwebtoken/jwt');

exports.login = (app) => {

  addPassportLocal();
  addPassportRefreshJWT();

  //Refresh

  app.post('/refresh',
  passport.authenticate('refresh-jwt', {failureRedirect: '/login', session: false}),
  function (req,res){
    User.findOne({refreshTokens:req.header.authorization}, (err,user) => {
      if(err) {
        console.log(err);
      } else{
        res.json({accessToken: createAccessJWT(user)});
      }

    return
  })})

  //Register

  app.post('/register', 
  passport.authenticate('refresh-jwt', {successRedirect: '/', session: false}),
  async (req,res) => {
      if(!(await User.exists({username: req.body.username}))){
        createNewUser(req,res);
        res.send('created User');
      } else {
        res.send('username taken!');
      }
    }
  )
  
  //Login
  
  app.post('/login',
    passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', session: false}),
    function(req,res){
      console.log('login info received! from Login.js');
      console.log(req.body);
      User.findOne({username:req.body.username}, (err,user) => {
        if(err) {
          console.log(err);
        } else{
          res.json({refreshToken: createRefreshJWT(user),});
          return;
        }
      })
      
    })
  
  //Logout
  
  app.delete('/session', function (req, res) {
    req.session.destroy();
    res.send('logged out.')
  })
  
  //Check if Logged In before showing content example
  
  app.get('/content', function(req, res) {
    res.send('you are still logged in.')
  })

  app.post('/test', function (req,res) {
    console.log('test complete!');
  })

    //TEST
// app.post('/hello', function (req,res) {
//   User.create({}, function(err,username){
//     if (err) return handleError(err);
//   })
//   res.send('done!')
// })
  
}

