const {URI} = require('./secrets/credentials.js');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const passport = require('passport');

const {expressRoutes} = require('./routes/express')
// const {createNewUser} = require('./database/mongooseCRUD')

const app = express()
const port = 3000


//mongoose

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
      console.log('Connected to MongoDB!')
  });


//express 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(passport.initialize())


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

expressRoutes(app);

// CRUD TEST
// createNewUser('Name','username','password','email');