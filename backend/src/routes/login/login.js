const passport = require('passport');
const {addPassportLocal} = require('../../services/passport/passport-local');
const {addPassportAccessJWT} = require('../../services/passport/passport-jwt')
const {createAccessJWT,createRefreshJWT,assignJWTToDevice, checkRefreshJWT, checkAccessJWT} = require('../../services/jsonwebtoken/jwt');
const {createNewUser} = require('../../database/mongooseCRUD');

const { User } = require('../../database/mongooseModels');


exports.login = (app) => {


  addPassportLocal();
  addPassportAccessJWT();

  //Access

  app.get('/access',
  passport.authenticate('passport-jwt', {failureRedirect: '/login', session: false}),
  function (req,res){
    console.log('access called!')
    let payload = checkAccessJWT(req.token);
    User.findOne({username: payload.username, _id: payload.id}, (err,user) => {
      if(err) {
        console.log(err);
        res.json({"user": null});
      } else{
        res.json({"user": user});
      }
    return
  })})

  //Refresh

  app.get('/refresh',
  async function (req,res){
    console.log('refresh called!')
    console.log(req.headers);
    let token = await req.get('authorization');
    console.log('token: ' + token);
    let deviceId = await req.get('deviceId');
    let payload = await checkRefreshJWT(token);
    console.log('payload: ' + payload);
    User.findOne({_id: payload.id, email: payload.email}, (err,user) => {
      if(err) {
        console.log(err);
        res.json({'accessToken': null});
      } 
      if (user.devices.some(obj => obj.deviceId === deviceId && obj.activeToken === token)){
        res.json({"accessToken": createAccessJWT(user)});
      }
      res.json({'accessToken': null});
  })})

  //Register

  app.post('/register', 
  async (req,res) => {
      if(!(await User.exists({username: req.body.username}))){
        await createNewUser(req,res);
        res.send('created User');
      } else {
        res.send('username taken!');
      }
    }
  )
  
  //Login
  
  app.post('/login',
    passport.authenticate('local', {session: false}),
    async function(req,res){
      console.log('login info received! from Login.js');
      console.log(req.body);
      await User.findOne({$or: [
        {email: req.body['username/email']},
        {username: req.body['username/email']},
    ]}, 
      function (err,user){
        if(err) {
          console.log(err);
        } else {
          let newRefreshJWT = createRefreshJWT(user);
          user.devices = assignJWTToDevice(user, req.get('deviceId'),newRefreshJWT);
          user.save();
          res.json({"refreshToken": newRefreshJWT, "currentUser": user});
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

