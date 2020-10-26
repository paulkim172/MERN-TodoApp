const express = require('express');
const {session} = require('./login/session');
const {login} = require('./login/userLogin')

const app = express()


/* ROUTES */

const routes = () => {
    
    app.get('/', (req, res) => {
        res.send('Hello World!')
        if(req.session){
          
        }
      })
    //Session

    session();
    
    //Login Routes
    
    login();
    
}
exports.routes = routes;