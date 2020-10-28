const {session} = require('./login/session');
const {login} = require('./login/login')

/* ROUTES */

exports.expressRoutes = (app) => {
    
    app.get('/', (req, res) => {
        res.send('Hello World!')
        if(req.session){
          
        }
      })
    //Session

    session(app);
    
    //Login Routes
    
    login(app);
    
}
