const {session} = require('./login/session');
const {login} = require('./login/login')

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
    
}
