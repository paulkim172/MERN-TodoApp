const {login} = require('./login/login')
const {user} = require('./user/user')

/* ROUTES */

exports.expressRoutes = (app) => {
  console.log('received expressRoutes')
    
    app.get('/', (req, res) => {
        res.send('Hello World!')
      })
    //Session

    // session(app);
    
    //Login Routes
    
    login(app);

    //User Routes;

    user(app);
    
}
