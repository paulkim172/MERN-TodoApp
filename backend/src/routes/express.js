const express = require('express');
const passport = require('passport');
const {session} = require('./login/session');
const {login} = require('./login/userLogin')

const app = express()


/* ROUTES */

const routes = () => {
    
    //Session

    session();
    
    //Login Routes
    
    login();
    
}
exports.routes = routes;