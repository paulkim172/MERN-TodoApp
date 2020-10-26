const {URI} = require('./secrets/credentials.js');
const mongoose = require('mongoose');
const express = require('express');

const {routes} = require('./routes/express')

const app = express()
const port = 3000

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});



//express 



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

routes();


//mongoose

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB!')
});


// CRUD TEST
// createNewUser('Paul','username','password','email','org','type',5,'yearly',true);